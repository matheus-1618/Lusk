import boto3
import json





# Função Lambda que retorna todos os itens da tabela
def lambda_handler(event, context):
    client = boto3.client('dynamodb')
    dynamodb = boto3.resource('dynamodb')
    
    response = client.list_tables()
    table_name = response['TableNames'][0]
    # Define a tabela do DynamoDB
    table = dynamodb.Table(table_name)

    # Obtém todos os itens da tabela
    response = table.scan()

    # Retorna a lista de itens
    return {
        'statusCode': 200,
        'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST",
            "Access-Control-Allow-Credentials" : 'true',
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        }, 
        'body': json.dumps(response['Items'])
    }