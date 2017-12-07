import requests
import json
from bs4 import BeautifulSoup
import html5lib

def getData(param):

    payload = {'page': param}
    r = requests.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text', params=payload)
    # decoding json
    data = r.json()
    # accessing the html code
    wikihtml = data['parse']['text']['*']

    # prettify the html data. Optional.
    soup = BeautifulSoup(wikihtml, "html5lib")
    for s in soup.find(["html"]):
        s.extract()
    return soup

"""
 soup = BeautifulSoup(wikihtml, "html5lib")
soup = soup.prettify(formatter="html")
    for s in soup.find_all(["html", "head", "body"]):
        s.extract()
"""