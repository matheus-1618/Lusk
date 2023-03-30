import os 

os.chdir('../terraform/')
os.system('terraform destroy -auto-approve')