import shutil
import os 
import subprocess
import requests


lambda_functions_names = []

lambda_folder = os.getcwd().split('/python')[0] +'/lambda_functions/'
for dir, subfolders, files in os.walk(os.path.abspath(lambda_folder)):
    for i,file in enumerate(files):
        print(f'{i+1} - ' + os.path.join(dir,file).split('/lambda_functions/')[-1])
        lambda_functions_names.append(os.path.join(dir,file).split('/lambda_functions/')[-1].split('.py')[0])

number_name = int(input('Write the number of the function which you want to deploy: '))
function_name = lambda_functions_names[number_name-1]
os.chdir('../lambda_functions/')
os.system(f"zip {function_name}.zip {function_name}.py")

os.chdir('../terraform/')
os.system(f'''terraform apply -var="function_name={function_name}" -var="filename=../lambda_functions/{function_name}.zip" -var="handler={function_name}.lambda_handler" -auto-approve''')

os.chdir('../lambda_functions/')
os.system(f"rm {function_name}.zip")


# Executa o comando `terraform apply` e captura a saída
output = subprocess.check_output(["terraform", "output", "my_lambda_api_endpoint"], cwd=os.getcwd().split('/lambda_functions')[0]+'/terraform')

# Converte a saída em uma string decodificando os bytes usando o formato UTF-8
output_str = output.decode("utf-8")

# Imprime a saída
myobj = {'somekey': 'somevalue'}

x = requests.post(output_str.split('"')[1]+'/example', json = myobj)

print(x.text)