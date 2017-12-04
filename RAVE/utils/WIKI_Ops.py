import requests
import json

def getData(par):

    payload = {'page': par, }
    r = requests.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&', params = payload)
    #print(r.status_code)
    # decoding json
    data = r.json()
    # accessing the html code
    textcontent = data['parse']['text']['*']
    # converts to string, not used
    #stringhtml = json.dumps(textcontent)
    return textcontent
