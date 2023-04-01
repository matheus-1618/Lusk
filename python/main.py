from Lusk import Lusk
from pyfiglet import Figlet 
import pyfiglet
import os
from dotenv import load_dotenv

print("====================================================================================".center(80))
f = Figlet(font = "isometric2",justify='center') 
print(f.renderText('LUSK'))
a = "Serverless Architecture Management Interface for AWS"
print(a.center(80))
print("====================================================================================".center(80))
if not load_dotenv(override=True):
    print("Welcome to Lusk!".center(80))
    print("For complete use of the interface, fill your AWS and Github credentials.".center(80))
    print("NEVER PUBLISH THIS .env FILE on the WEB.\n".center(80))
    aws_acess_key = input("[LUSK] AWS ACCESS KEY ID: ")
    aws_secret_key = input("[LUSK] AWS_SECRET_KEY: ")
    github_key = input("[LUSK] GITHUB ACCESS TOKEN: ")
    with open('../.env', 'w') as f:
        f.write(f'AWS_ACCESS_KEY_ID={aws_acess_key}\n')
        f.write(f'AWS_SECRET_ACCESS_KEY={aws_secret_key}\n')
        f.write(f'GITHUB_TOKEN={github_key}')

aws_acess_key = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
github_key = os.getenv('GITHUB_TOKEN')

lusk = Lusk(aws_acess_key,aws_secret_key,github_key)
while True and load_dotenv(override=True):
    print()
    print("[LUSK] Select your action:".center(80))
    print('\n')
    print('1 - Deploy Lambda Function'.center(80))
    print('2 - Create Dynamo DB Table'.center(80))
    print('3 - Create Amplify App'.center(80))
    print('4 - Update Amplify App'.center(80))
    print('5 - Destroy resources'.center(80))
    print()
    ans = input(" Decide your action (0 for quit): ")
    if ans == '1':
        lusk.deploy_lambda_function()
    elif ans == '2':
        lusk.create_dynamo_db_table()
    elif ans == '3':
        lusk.create_amplify_app()
    elif ans == '4':
        lusk.update_app()
    elif ans == '5':
        lusk.destroy_resources()
    else:
        exit()