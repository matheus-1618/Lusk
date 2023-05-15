import os
from github import Github
from git import Repo
import git
import json
import subprocess
import boto3
import os

class Lusk:
    def __init__(self,aws_key_id,aws_secret_id,github_token):
        self.created_app = False
        self.aws_key_id = aws_key_id
        self.aws_secret_id = aws_secret_id
        self.github_token = github_token
    
    def create_dynamo_db_table(self,name_table = None) -> None:
        if name_table == None:
            name_table = input("Nome da sua tabela: ")
        print(f"[LUSK] Creating Dynamo Table: {name_table}")
        os.chdir('../../terraform/')
        os.system('terraform init')
        os.system(f'''terraform apply -target=module.dynamodb -var="access_key={self.aws_key_id}" -var="secret_key={self.aws_secret_id}" -var="name_table={name_table}" -auto-approve''')
        os.chdir('../src/backend')

    def create_amplify_app(self,repo_name = None):
        print("[LUSK] Creating new App")
        os.chdir('../../webapp')
        os.system('rm -rf .git')
        os.chdir('../src/backend')
        print("[LUSK] Erasing data from possible last repository")
       
        g = Github(os.getenv('GITHUB_TOKEN'))

        code_directory = os.getcwd().split('/src/backend')[0]+'/webapp'

        if repo_name == None:
            repo_name = input("--> Qual o nome do repositorio desejado? ")
    
        repo_description = 'Base repository to automatic deploy and integration with Amplify via Lusk'

        print("[LUSK] Creating new Repository")
        repo = g.get_user().create_repo(repo_name, description=repo_description, auto_init=True,private=True)
        repo_url = repo.clone_url
        repo_local_path = os.path.join(code_directory, '')
        os.makedirs(repo_local_path, exist_ok=True)
        repo_local = Repo.init(repo_local_path)
        # Adiciona os arquivos do código ao repositório local
        print("[LUSK] Adding template files")
        repo_local.index.add('public/')
        repo_local.index.add('src/')
        repo_local.index.add('.gitignore')
        repo_local.index.add('package-lock.json')
        repo_local.index.add('package.json')
        repo_local.index.add('README.md')
        repo_local.index.commit('Lusk initialized Frontend interface repository')

        remote = repo_local.create_remote('origin', url=repo.clone_url)
        repo_local.git.execute(['git', 'checkout','-B', 'main'])
        repo_local.git.execute(['git', 'push', '--set-upstream','--force', 'origin','main'])

        print("[LUSK] Executing Terraform")
        os.chdir('../../terraform/')
        os.system('terraform init')
        os.system(f'''terraform apply -target=module.amplify -var="access_key={self.aws_key_id}" -var="secret_key={self.aws_secret_id}" -var="url_repository={repo_url.split('.git')[0]}" -var="app_name={repo_name}" -var="token={os.getenv('GITHUB_TOKEN')}" -auto-approve''')

        print("[LUSK] Building App on Amplify Hosting")
        output = subprocess.check_output(["terraform", "output", "amplify_url"], cwd=os.getcwd())
        output_str = output.decode("utf-8")
        client = boto3.client('amplify',region_name='us-east-1')
        client.start_job(
            appId=output_str.split('"')[1],
            branchName='main',
            jobType='RELEASE'
        )

        response = client.get_app(
            appId=output_str.split('"')[1])
        print("[LUSK] WebApp deployed with sucess!")
        print(f"[LUSK] Applcation URL: main.{response['app']['defaultDomain']}")
        os.chdir('../src/backend/')
        self.created_app = True
        return f"https://main.{response['app']['defaultDomain']}"
    
    def get_lambdas(self):
        lambda_functions_names = []
        lambda_folder = os.getcwd().split('/src/backend')[0] +'/lambda_functions/'
        for dir, subfolders, files in os.walk(os.path.abspath(lambda_folder)):
            for i,file in enumerate(files):
                print(f'{i+1} - ' + os.path.join(dir,file).split('/lambda_functions/')[-1])
                lambda_functions_names.append(os.path.join(dir,file).split('/lambda_functions/')[-1].split('.py')[0])
        return lambda_functions_names

    def deploy_lambda_function(self, function_number:int = None):
        lambda_functions_names = self.get_lambdas()
        if function_number is None:
            number_name = int(input('Write the number of the function which you want to deploy: '))
            function_name = lambda_functions_names[number_name-1]
        else:
            function_name = lambda_functions_names[function_number]
        os.chdir('../../lambda_functions/')
        os.system(f"zip {function_name}.zip {function_name}.py")

        os.chdir('../src/backend/')
        with open('variables.json', 'r') as f:
            data = json.load(f)
        
        # Adicionar a nova função
        new_function = {
        "name": function_name,
        "filename": f"../lambda_functions/{function_name}.zip",
        "handler": f"{function_name}.lambda_handler",
        "language": "python3.8",
        "attach_role": True
        }

        data['functions'].append(new_function)
        
        # Salvar o arquivo JSON modificado
        with open('variables.json', 'w') as f:
            json.dump(data, f, indent=2)
        
        os.chdir('../../terraform/')
        os.system('terraform init')
        os.system(f'''terraform apply -target=module.lambda -var="access_key={self.aws_key_id}" -var="secret_key={self.aws_secret_id}" -var-file=../src/backend/variables.json -auto-approve''')

        os.chdir('../lambda_functions/')
        os.system(f"rm {function_name}.zip")
        
        # Executa o comando `terraform apply` e captura a saída
        output =  subprocess.check_output(["terraform", "output", "my_lambda_api_endpoint"], cwd=os.getcwd().split('/lambda_functions')[0]+'/terraform')

        # Converte a saída em uma string decodificando os bytes usando o formato UTF-8
        output_str = output.decode("utf-8")
        os.chdir('../src/backend/')
        return output_str
        
    def destroy_resources(self):
        print("[LUSK] Destroyng resources")
        with open('variables.json', 'r') as f:
            data = json.load(f)
        data['functions'] = []
        with open('variables.json', 'w') as f:
            json.dump(data, f, indent=2)
        os.chdir('../../terraform/')
        os.system(f'terraform destroy -var="access_key={self.aws_key_id}" -var="secret_key={self.aws_secret_id}" -var-file=../src/backend/variables.json -auto-approve')
        os.chdir('../src/backend/')
        return True
    
    def update_app(self) ->bool:
        if self.created_app:
            print("[LUSK] Updating WebApp")
            repo = git.Repo('../../webapp')
            repo.git.pull()
            repo.git.add('--all')
            commit_message = 'Lusk updates deployment'
            repo.index.commit(commit_message)
            origin = repo.remote('origin')
            origin.push()
            return True
        else:
            print("[LUSK] No WebApp created yet")
            return False