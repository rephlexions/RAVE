$('document').ready(function () {

    // Load slideshow banner
    $('div.slider').slider({
    height: 200,
    indicators: false,
    interval: 3000,
        });

    var parsedData = JSON.parse(jsondata);
    handleSearchResults(parsedData);
});

function handleSearchResults(parsedData) {

    var titles = parsedData['text'][1];
    var intro_text = parsedData['text'][2];
    console.log(parsedData);
    if(titles.length === 0){
        var txt = $('<h3></h3>').text('Couldn\'t find anything :(');
        $('#empty-results').append(txt);
    }
    else{
        var pageIDs = parsedData['images']['query']['pageids'];

        $("div.search-result").each(function (i) {
            $(this).find('span.card-title').text(titles[i]);
            $(this).find('p').text(intro_text[i]);
            $(this).find('a').attr("href", "/view/?page=" + titles[i]);

            if(parsedData['images']['query']['pages'][pageIDs[i]].hasOwnProperty('thumbnail')){
                $(this).find('img').attr("src", parsedData['images']['query']['pages'][pageIDs[i]]['thumbnail']['source']);
            }
            $(this).show();
        });
    }
}
