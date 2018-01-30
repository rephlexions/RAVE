$("document").ready(function () {
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

    var parsed_data = JSON.parse(jsondata);
    var titles = parsed_data["text"][1];
    var intro_text = parsed_data["text"][2];

    if(titles.length === 0){
        var txt = $("<h5></h5>").text("Couldn't find anything :(");
        $("div.empty-results").append(txt);
    }
    else{
        $("div.search-results").slideDown("slow").show();
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
            else{
                i++;
            }
            });

    }

});