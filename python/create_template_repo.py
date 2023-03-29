from github import Github
from git import Repo
import os
import subprocess
import boto3

os.chdir('../webapp')
os.system('rm -rf .git')
os.chdir('../python')
print("--> Apagando repo anterior")
# Insira aqui o seu token de acesso pessoal
access_token = ''

# Cria uma instância do objeto Github
g = Github(access_token)

# Especifica o caminho para o diretório do código
code_directory = os.getcwd().split('/python')[0]+'/webapp'

# Especifica o nome do repositório
repo_name = input("--> Qual o nome do repositorio desejado? ")
#repo_name = 'Lusk-WebApp'

# Especifica a descrição do repositório (opcional)
repo_description = 'Base repository to automatic deploy and integration with Amplify via Lusk'

print("--> Criando novo repositorio")
# Cria um novo repositório no GitHub
repo = g.get_user().create_repo(repo_name, description=repo_description, auto_init=True,private=True)
repo_url = repo.clone_url
# Inicializa o repositório localmente
repo_local_path = os.path.join(code_directory, '')
os.makedirs(repo_local_path, exist_ok=True)
repo_local = Repo.init(repo_local_path)
# Adiciona os arquivos do código ao repositório local
print("--> Subindo template")
repo_local.index.add('public/')
repo_local.index.add('src/')
repo_local.index.add('.gitignore')
repo_local.index.add('package-lock.json')
repo_local.index.add('package.json')
repo_local.index.commit('Lusk Initilize Repository')

# Configura o repositório remoto
remote = repo_local.create_remote('origin', url=repo.clone_url)
repo_local.git.execute(['git', 'checkout','-B', 'main'])
repo_local.git.execute(['git', 'push', '--set-upstream','--force', 'origin','main'])

print("--> Executando terraform")
os.chdir('../terraform/')
os.system('terraform init')
os.system(f'''terraform apply -target=module.amplify -var="url_repository={repo_url.split('.git')[0]}" -var="app_name={repo_name}" -var="token={access_token}" -auto-approve''')

print("--> Executando Build")
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
print(f"\nURL da aplicação: main.{response['app']['defaultDomain']}")
