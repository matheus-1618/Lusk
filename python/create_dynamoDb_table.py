import shutil
import os 

name_table = input("Nome da sua tabela: ")

os.chdir('../terraform/')
os.system('terraform init')
os.system(f'''terraform apply -target=module.dynamodb -var="name_table={name_table}"  -auto-approve''')
