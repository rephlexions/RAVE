import requests
import json
from collections import defaultdict

# TODO Browser receives image links as Objects. Fix this
def get_search_results(param):
    payload = {'search': param}
    search_req = requests.get("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0%7C14&limit=12", params=payload)

    if search_req.status_code == 200:

        search_results = search_req.json()
        titles_list = search_results[1]
        dict_images = defaultdict(list)

        for title in titles_list:
            payload = {'titles': title}
            image_req = requests.get(
                "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=500",
                params=payload)
            images = image_req.json()
            i = images["query"]["pages"]

            for k in i.values():
                dict_images["images"].append(k)
        j_dict_images = json.dumps(dict_images)
        response_dict = [search_results, dict_images]
        return json.dumps(response_dict)


def get_wiki_page(param):
    payload = {'page': param}
    r = requests.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&disableeditsection=1', params=payload)

    if r.status_code == 200:
        # decoding json
        data = r.json()
        # accessing the html code
        wiki_html = data['parse']['text']['*']

        return wiki_html

"""
URL to get the first image
https://en.wikipedia.org/w/api.php?action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100

URL to get intro text
https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow

"""
"""
# /w/api.php?action=parse&format=json&page=Cubism&prop=text%7Cimages&disableeditsection=1&contentmodel=wikitext
# https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Modena&prop=text&wrapoutputclass=mw-parser-output&utf8=1

def get_wiki_page(param):

    payload = {'page': param}
    r = requests.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text', params=payload)
    # https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Modena&prop=text&wrapoutputclass=mw-parser-output&utf8=1
    # decoding json
    if r.status_code == 200:

        data = r.json()
        # accessing the html code
        wiki_html = data['parse']['text']['*']

        # prettify the html data. Optional.
        # TODO https://stackoverflow.com/questions/15059206/how-should-i-populate-json-data-in-a-django-template
        # TODO https://duckduckgo.com/?q=jquery+append+html+to+div+json&t=ffab&ia=qa
        soup = BeautifulSoup(wiki_html, "html5lib")
        pretty_soup = soup.div.prettify(formatter="html", encoding="utf-8")
        return pretty_soup
"""