import json
import urllib3

def lambda_handler(event, context):
    http = urllib3.PoolManager()
    r = http.request('GET', "https://official-joke-api.appspot.com/random_joke")

    text = json.loads(r.data)
    out = "Random Joke:\n"+text['setup'] +" " + text['punchline']

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
        'body': json.dumps(out)
    }