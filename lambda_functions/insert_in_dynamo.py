import boto3
import json

dynamodb = boto3.client('dynamodb')

# Função Lambda que insere um novo item na tabela
def lambda_handler(event, context):

    # Obtém o corpo da requisição
    body = json.loads(event['body'])

    response = dynamodb.list_tables()
    table_name = response['TableNames'][0]


    # Insere o novo item na tabela
    response = dynamodb.put_item(
        Item={
            'id': body['id'],
            'name': body['name']
        }
    )

    # Retorna a resposta da operação
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
        'body': json.dumps('Item inserido com sucesso')
    }

