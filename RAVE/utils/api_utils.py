import requests
import json
import os
from TechWeb.settings import STATIC_DIR


def get_search_results(param):
    """
    :param param: search query
    :return: search results, intro text and first image for each result in json format
    """
    payload = {'search': param}
    search_req = requests.get("https://en.wikipedia.org/w/api.php?action=opensearch&format=json"
                              "&namespace=0%7C14&limit=12", params=payload)

    if search_req.status_code == 200:
        search_results = search_req.json()
        titles_list = search_results[1]
        string_titles = '|'.join(titles_list)
        payload = {'titles': string_titles}
        images_req = requests.get(
            "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=700&indexpageids=1",
            params=payload)
        images_results = images_req.json()

        response_dict = {"text": search_results, "images": images_results}
        return json.dumps(response_dict)


def get_wiki_page(param):
    """
    :param param: page title
    :return: Parsed Wikipedia text as json
    """
    # Make request to Wiki API
    payload = {'page': param}
    wiki_r = requests.get('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&disableeditsection=1', params=payload)

    if wiki_r.status_code == 200:
        # Parsing Wiki Data
        parsed_wiki = wiki_r.json()
        wiki_html = parsed_wiki['parse']['text']['*']
        crossref_items = get_crossref_data(param)
        # Case 1: Topic is not an Art Movement. Return only wiki page
        if crossref_items is None:
            response_dict = {'wiki': wiki_html, 'crossref': None}
            return json.dumps(response_dict)
        # Case 2: Topic is an A.M.. Return wiki and crossref data
        else:
            response_dict = {'wiki': wiki_html, 'crossref': crossref_items}
            return json.dumps(response_dict)


def get_crossref_data(param):
    """
    :param param: Topic as string
    :return: Returns Crossref publications as JSON if topic belongs to Art Movements Category, none otherwise
    """
    crossref_topic = ""
    # Search if param belongs to Art Movement category
    file_path = os.path.join(STATIC_DIR, 'json/category_pages.json')
    with open(file_path) as json_data:
        parsed_categories_list = json.load(json_data)

        for i in parsed_categories_list['query']['categorymembers']:
            if i['title'] == param:
                crossref_topic = i['title']
                break

    if crossref_topic:
        payload = {'query': crossref_topic}
        crossref_req = requests.get('https://api.crossref.org/works?sort=relevance&order=desc&mailto=ovidiu.cara@studio.unibo.it', params=payload)
        if crossref_req.status_code == 200:
            parsed_crossref = crossref_req.json()
            return json.dumps(parsed_crossref)
    else:
        return None

"""
URL to get the first image
https://en.wikipedia.org/w/api.php?action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100

URL to get intro text
https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow

https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=Post-Impressionism&imlimit=max
https://en.wikipedia.org/w/api.php?action=query&titles=File:1914%20Redon%20Zyklop%20anagoria.JPG|File:Affiche%20Volpini.jpg|File:Bonnard-the%20dining%20room%20in%20the%20country.jpg&prop=imageinfo&iiprop=url&format=json


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