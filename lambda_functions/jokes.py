import json
import urllib3

def lambda_handler(event, context):


    http = urllib3.PoolManager()
    r = http.request('GET', "https://official-joke-api.appspot.com/random_joke")

    text = json.loads(r.data)
    out = "Random Joke:\n"+text['setup'] +" " + text['punchline']

    return {
        'statusCode': 200,
        'body': json.dumps(out)
    }