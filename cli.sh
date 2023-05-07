CURRENT_DIR=$(pwd)
MED_PATH="/src/backend"
DIR_PATH="/src/backend/venv"
full_path="$CURRENT_DIR/$DIR_PATH"
if [ -d "$full_path" ]; then
    echo "Starting Backend"
    cd "$CURRENT_DIR/$MED_PATH"
    source venv/activate/bin
    python3 main.py
    cd "$CURRENT_DIR"
else
    echo "Dependencies not satisfied, run sudo ./install.sh"
fi