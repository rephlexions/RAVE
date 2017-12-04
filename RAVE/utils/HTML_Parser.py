from bs4 import BeautifulSoup

def HTMLParser(html):

    soup = BeautifulSoup(html, "html5lib")
    for s in soup.find_all(["div", "sup", "table"]):
        s.extract()
    parsedtags = soup.prettify()
    return parsedtags
