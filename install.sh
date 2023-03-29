#instalando Dependências Terraform
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg

gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update

sudo apt-get install terraform

#Instalando Node-js versão adequada para React
curl -sL https://deb.nodesource.com/setup_14.9 -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs

#Instalando Python e pip
sudo apt-get install python3
sudo apt-get install python3-pip
 
#Criando diretórios para utilização
mkdir lambda_functions
mkdir python
mkdir terraform
mkdir webapp

# Configurando depedências da automação via Python
python3 -m virtualenv venv
pip install -r requirements.txt

# Criando aplicativo react 
cd webapp/
npx create-react-app Lusk-app
