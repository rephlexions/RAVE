$('document').ready(function () {

    // Load slideshow banner
    $('div.slider').slider({
    height: 200,
    indicators: false,
    interval: 3000,
        });

    var parsed_data = JSON.parse(jsondata);
    var titles = parsed_data['text'][1];
    var intro_text = parsed_data['text'][2];
    if(titles.length === 0){
        var txt = $('<h3></h3>').text('Couldn\'t find anything :(');
        $('#empty-results').append(txt);
    }
    else{
        var page_ids = parsed_data['images']['query']['pageids'];
        console.log(page_ids);
        $("div.search-result").each(function (i) {
            $(this).find('span.card-title').text(titles[i]);
            $(this).find('p').text(intro_text[i]);
            $(this).find('a').attr("href", "/view/?page=" + titles[i]);

            if(parsed_data['images']['query']['pages'][page_ids[i]].hasOwnProperty('thumbnail')){
                $(this).find('img').attr("src", parsed_data['images']['query']['pages'][page_ids[i]]['thumbnail']['source']);
            }
            $(this).show();
        });
    }

});

var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
/*
        $("span.card-title").each(function (i, obj) {
            $(this).text(titles[i]);
        });

        $("div.card-content").children('p').each(function (i, obj) {
           $(this).text(intro_text[i]);
        });
        $("div.card-action").children('a').each(function (i, obj) {
           $(this).attr("href", "/view/?page=" + titles[i]);
        });

        var page_ids = parsed_data['images']['query']['pageids'];
        $("div.card-image").children("img").each(function (i, obj) {
            if(parsed_data['images']['query']['pages'][page_ids[i]].hasOwnProperty('thumbnail')){
               $(this).attr("src", parsed_data['images']['query']['pages'][page_ids[i]]['thumbnail']['source']);
               //console.log(parsed_data['images']['query']['pages'][page_ids[i]]['thumbnail']['source']);
            }

            });*/