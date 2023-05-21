import os
from github import Github
from git import Repo
import boto3
import subprocess

def deploy_infrastructure(repo_name = None):
    github_token = os.getenv("GITHUB_TOKEN")
    g = Github(github_token)

    code_directory = os.getcwd()+'/webapp'

    if repo_name == None:
        repo_name = input("--> Qual o nome do repositorio desejado? ")
    
    table_name = input("-->Qual o nome da tabela de Banco de dados a ser criada?")

    repo_description = 'Base repository to automatic deploy and integration with Amplify via Lusk'
    repo = g.get_user().create_repo(repo_name, description=repo_description, auto_init=True,private=True)
    repo_url = repo.clone_url
    repo_local_path = os.path.join(code_directory, '')
    os.makedirs(repo_local_path, exist_ok=True)
    repo_local = Repo.init(repo_local_path)
    # Adiciona os arquivos do código ao repositório local
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

    os.chdir('terraform/')
    os.system('terraform init')
    os.system(f'''terraform apply -var-file=lambda/variables.json -var="name_table={table_name}" -var="url_repository={repo_url.split('.git')[0]}" -var="app_name={repo_name}" -var="token={github_token}" -auto-approve''')

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

if __name__ == "__main__":
    deploy_infrastructure()