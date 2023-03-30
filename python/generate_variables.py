import json

# Abrir o arquivo JSON
with open('variables.json', 'r') as f:
    data = json.load(f)

# Adicionar a nova função
new_function = {
  "function_name": "my_new_lambda_function",
  "filename": "my_lambda_function.zip",
  "handler": "my_handler",
  "language": "python3.8"
}

data['functions'].append(new_function)

# Salvar o arquivo JSON modificado
with open('variables.json', 'w') as f:
    json.dump(data, f, indent=2)