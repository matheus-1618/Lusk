
from pydantic import BaseModel,Field
from typing import Optional, List

#BaseModel de request
class Credentials(BaseModel):
    aws_access_key: str  = Field(default = "", max_length=300, example="LKIMX45XKILIA4VG7MPI")
    aws_secret_key: str  = Field(default = "", max_length=300, example="7jfndXSF4+AjfndXSF4+0jfndXSF4")
    github_key: str  = Field(default = "", max_length=300, example="ghp_7jfndXSF47jfndXSF47jfndXSF4")

class Lambda_number(BaseModel):
    number: str  = Field(default = None, title="Identificador da Lambda", example=1)

class Table_name(BaseModel):
    name: str  = Field(default = "", max_length=300, example="Lusk table")

class App_name(BaseModel):
    name: str  = Field(default = "", max_length=300, example="Lusk app")