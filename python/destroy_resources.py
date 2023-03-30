import os 
import json

with open('variables.json', 'r') as f:
    data = json.load(f)
data['functions'] = []
# Salvar o arquivo JSON modificado
with open('variables.json', 'w') as f:
    json.dump(data, f, indent=2)

os.chdir('../terraform/')
os.system('terraform destroy -var-file=../python/variables.json -auto-approve')