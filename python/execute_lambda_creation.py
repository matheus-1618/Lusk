import os
os.chdir('../terraform/')
os.system(f'terraform apply -var="function_name=onemore" -var="filename=../lambda/my_lambda_function.zip" -auto-approve')
