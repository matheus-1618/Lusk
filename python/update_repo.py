import os
from github import Github
from git import Repo

# Insira aqui o seu token de acesso pessoal
access_token = ''

# Cria uma instância do objeto Github
g = Github(access_token)

# Localização do diretório que você deseja enviar para o seu repositório
directory = os.getcwd()+ '/webapp'

# Nome do repositório que você criou anteriormente
repo_name = 'Lusk-WebApp'

# Cria o caminho completo para o diretório do repositório
repo_path = os.path.join(directory, repo_name)

# Inicializa um novo repositório Git no caminho especificado
repo = Repo.init(repo_path)

# Adiciona todo o conteúdo do diretório ao índice Git
repo.index.add('*')

# Realiza um commit com a mensagem especificada
repo.index.commit('Lusk update repo')

# Cria um novo repositório no GitHub com o mesmo nome que o diretório
repo_github = g.get_user().create_repo(repo_name,private=True)

# Configura o repositório remoto para o novo repositório criado no GitHub
origin = repo.remote(name='origin', url=f"git@github.com:{g.get_user().login}/{repo_github.name}.git")

# Empurra as alterações para o repositório remoto
origin.push()

