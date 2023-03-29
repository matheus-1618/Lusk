import git
# Abre o repositório local
repo = git.Repo('../webapp')

# Atualiza a branch atual
repo.git.pull()

# Adiciona todos os arquivos ao staging area
repo.git.add('--all')

# Faz o commit com uma mensagem
commit_message = 'Lusk updates deployment'
repo.index.commit(commit_message)

# Faz o push para a branch remota
origin = repo.remote('origin')
origin.push()