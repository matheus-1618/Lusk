CURRENT_DIR=$(pwd)
MED_PATH="/src/backend"
DIR_PATH="/src/backend/venv"
full_path="$CURRENT_DIR/$DIR_PATH"
if [ -d "$full_path" ]; then
    echo "Iniciando Backend"
    cd "$CURRENT_DIR/$MED_PATH"
    source venv/activate/bin
    uvicorn server:app --reload --port 5200 > /dev/null &
    BACKEND_PID=$!
    cd "$CURRENT_DIR"
else
    echo "Dependências não satisfeitas, rode sudo ./install.sh"
fi


#Iniciando o Frontend em background
CURRENT_DIR=$(pwd)
MED_PATH="/src/frontend"
DIR_PATH="/src/frontend/node_modules"
full_path="$CURRENT_DIR/$DIR_PATH"
if [ -d "$full_path" ]; then
    echo "Iniciando Frontend"
    cd "$CURRENT_DIR/$MED_PATH"
    npm start > /dev/null &
    FRONTEND_PID=$!
    cd "$CURRENT_DIR"

else
    echo "Dependências não satisfeitas, rode sudo ./install.sh"
fi

# Aguardando sinal de interrupção (CTRL-C)
while true; do
    read -r -p "Pressione CTRL-C para encerrar a aplicação" response
done

# Matando o processo do frontend
kill "$FRONTEND_PID"
kill "$BACKEND_PID"