from fastapi import FastAPI,HTTPException,Query,Path
from fastapi.responses import HTMLResponse
from basemodels import *
from typing import Annotated
from Lusk import Lusk
from dotenv import load_dotenv
import os


app = FastAPI()
lusk = Lusk('aws_acess_key','aws_secret_key','github_key')

@app.get("/credentials",status_code=200,tags=["index"])
async def is_logged():
    if load_dotenv(override=True):
        lusk.aws_key_id = os.getenv('AWS_ACCESS_KEY_ID')
        lusk.aws_secret_id = os.getenv('AWS_SECRET_ACCESS_KEY')
        lusk.github_key = os.getenv('GITHUB_TOKEN')
        return True
    return False

@app.post("/credentials",status_code=201)
async def overwrite_credentials(credentials: Credentials):
    with open('../../.env', 'w') as f:
        f.write(f'AWS_ACCESS_KEY_ID={credentials.aws_acess_key}\n')
        f.write(f'AWS_SECRET_ACCESS_KEY={credentials.aws_secret_key}\n')
        f.write(f'GITHUB_TOKEN={credentials.github_key}')
    return {"response":"sucessfull created"}


