from github import Github
from git import Repo
import os

print("Apagando repo anterior")
os.chdir('../webapp')
os.system("rm -rf .git")
# Insira aqui o seu token de acesso pessoal
access_token = ''

# Cria uma instância do objeto Github
g = Github(access_token)

# Especifica o caminho para o diretório do código
code_directory = os.getcwd()

# Especifica o nome do repositório
repo_name = 'Lusk-App'

# Especifica a descrição do repositório (opcional)
repo_description = 'Base repository to automatic deploy and integration with Amplify via Lusk'

# Cria um novo repositório no GitHub
repo = g.get_user().create_repo(repo_name, description=repo_description, auto_init=True,private=True)

repo_url = repo.clone_url

# Inicializa o repositório localmente
repo_local_path = os.path.join(code_directory, '')
os.makedirs(repo_local_path, exist_ok=True)
repo_local = Repo.init(repo_local_path)
# Adiciona os arquivos do código ao repositório local
repo_local.index.add('*')
repo_local.index.commit('Lusk Initilize Repository')

# Configura o repositório remoto
remote = repo_local.create_remote('origin', url=repo.clone_url)
repo_local.git.execute(['git', 'checkout','-B', 'main'])
repo_local.git.execute(['git', 'push', '--set-upstream','--force', 'origin','main'])

# os.chdir('../terraform/')
# os.system('terraform init')
# os.system(f'''terraform apply -target=module.amplify -var="url_repository={repo_url}" -auto-approve''')


