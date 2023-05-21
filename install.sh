#instalando Dependências Terraform
if ! command -v terraform &> /dev/null; then
    echo "Instalando Terraform"
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
    echo "O Terraform já está instalado!"
fi

#instalando Dependências Node.js
if ! command -v node &> /dev/null; then
    echo "Instalando Node.js acima da versão 14"
    CURRENT_DIR=$(pwd)
    cd ~
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt install nodejs
    cd "$CURRENT_DIR"
else
    echo "O Node já está instalado!"
fi


#Instalando python caso não detectado
if ! command -v python3 &> /dev/null; then
    echo "Python e/ou Python 3 não estão instalados, instalando Python 3..."
    sudo apt-get update
    sudo apt-get install python3
    python3 -m pip install virtualenv
else
    echo "Python e Python 3 já estão instalados!"
fi
sudo apt-get install zip

