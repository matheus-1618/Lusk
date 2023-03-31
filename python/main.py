from Lusk import Lusk
from pyfiglet import Figlet 
import pyfiglet
print("==============================================================================".center(80))
f = Figlet(font = "slant",justify='center') 
print(f.renderText('LusK'))
a = "Serverless Architecture Management Interface for AWS"
print(a.center(80))
print("==============================================================================".center(80))
lusk = Lusk()
lusk.create_amplify_app
lusk.create_dynamo_db_table
lusk.deploy_lambda_function
lusk.destroy_resources
lusk.update_app
while True:
    print("\n[LUSK] Select your action:")
    print('1 - Deploy Lambda Function')
    print('2 - Create Dynamo DB Table')
    print('3 - Create Amplify App')
    print('4 - Update Amplify App')
    print('5 - Destroy resources')
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