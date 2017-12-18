import requests
from bs4 import BeautifulSoup


def get_results(param):
    payload = {'search': param}
    r = requests.get("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0%7C14&limit=10",
                     params=payload)
    if r.status_code == 200:
        search_results = r.json()
        s = search_results[1]
        return s


def get_wiki_page(param):

    payload = {'page': param}
    r = requests.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text', params=payload)
    # https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Modena&prop=text&wrapoutputclass=mw-parser-output&utf8=1
    # decoding json
    if r.status_code == 200:

        data = r.json()
        # accessing the html code
        wikihtml = data['parse']['text']['*']

        # prettify the html data. Optional.
        # TODO https://stackoverflow.com/questions/15059206/how-should-i-populate-json-data-in-a-django-template
        # TODO https://duckduckgo.com/?q=jquery+append+html+to+div+json&t=ffab&ia=qa
        soup = BeautifulSoup(wikihtml, "html5lib")
        prettysoup = soup.div.prettify(formatter="html",encoding="utf-8")
        return prettysoup

"""
    soup = BeautifulSoup(wikihtml, "html5lib")
    soup = soup.prettify(formatter="html")
    for s in soup.find_all(["html", "head", "body"]):
        s.extract()
"""