from fastapi import FastAPI,HTTPException,Query,Path
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from basemodels import *
from typing import Annotated
from Lusk import Lusk
from dotenv import load_dotenv
import os


app = FastAPI()
app.add_middleware(CORSMiddleware,
               allow_origins=["*"],
               allow_credentials=True,
               allow_methods=["*"],
               allow_headers=["*"],)

lusk = Lusk(os.getenv('AWS_ACCESS_KEY_ID'),os.getenv('AWS_SECRET_ACCESS_KEY'),os.getenv('GITHUB_TOKEN'))

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
    try:
        with open('../../.env', 'w') as f:
            f.write(f'AWS_ACCESS_KEY_ID={credentials.aws_access_key}\n')
            f.write(f'AWS_SECRET_ACCESS_KEY={credentials.aws_secret_key}\n')
            f.write(f'GITHUB_TOKEN={credentials.github_key}')
        return {"response":"sucessfull created"}
    except:
        return {"response":"error"}
    
@app.get("/destroy",status_code=200)
async def destroy_resources():
    try:
        lusk.destroy_resources()
        return {"response":"deleted"}
    except:
        return {"response":"error"}



