#instalando Dependências Terraform
if ! command -v terraform &> /dev/null; then
    echo "Installing Terraform"
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
else
    echo "O Terraform already installed!"
fi

#instalando Dependências Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js above version 14"
    CURRENT_DIR=$(pwd)
    cd ~
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt install nodejs
    cd "$CURRENT_DIR"
else
    echo "Node.js already installed!"
fi

#Instalando package da estrutura frontend
CURRENT_DIR=$(pwd)
DIR_PATH="/src/frontend/node_modules"
full_path="$CURRENT_DIR/$DIR_PATH"
if [ -d "$full_path" ]; then
    echo "App ready to run!"
else
    echo "Installing Lusk dependecies"
    cd "$CURRENT_DIR/src/frontend/"
    npm i --force 
    cd "$CURRENT_DIR"
fi

#Instalando python caso não detectado
if ! command -v python3 &> /dev/null; then
    echo "Python e/ou Python 3 are not installed, installing them for you..."
    sudo apt-get update
    sudo apt-get install python3
    pip install virtualenv
else
    echo "Python or Python 3 already installed!"
fi

#Ativando ambiente virtual para instalação das dependências
CURRENT_DIR=$(pwd)
MED_PATH="src/backend"
DIR_PATH="src/backend/venv"
full_path="$CURRENT_DIR/$DIR_PATH"
if [ -d "$full_path" ]; then
    echo "Virtual Enviroment already configured"
else
    echo "Installing virtual environment"
    cd "$CURRENT_DIR/$MED_PATH"
    python3 -m virtualenv venv
    pip install -r "$CURRENT_DIR"/requirements.txt
    cd "$CURRENT_DIR"
    echo "Enviroment ready"
fi

sudo apt-get install zip
pip install virtualenv
