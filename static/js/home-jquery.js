$('document').ready(function () {

    $(function(){
        $("div").slice(0, 10).show(); // select the first ten
        $("#load").click(function(e){ // click event for load more
            e.preventDefault();
            $("div:hidden").slice(0, 10).slideDown('slow').show(); // select next 10 hidden divs and show them
            if($("div:hidden").length == 0){ // check if any hidden divs still exist
               $('#load').hide(); //hide lad more button
            }
        });
    });
    $('div.slider').slider({
        height: 400,
        indicators: false,
        interval: 3000,
    });
});

/*

    $.ajax({
        url: "/ajax/search",
        method: "GET",
        data: {"search": search_query},
        dataType: "json",
        success: function (data) {

            var parsed_data = JSON.parse(data);
            console.log(parsed_data[0]["images"])

            parsed_data[0] for Title and Intro text
            parsed_data[1] for images

            var str = JSON.stringify(parsed_data[1]);
            console.log(JSON.parse(str));

            //console.log(parsed_data[Object.keys(parsed_data)[2]]);

            var titles = parsed_data[0][1];
            var intro_text = parsed_data[0][2];
            $("span.card-title").each(function (i, obj) {
               $(this).text(titles[i]);
            });
            $("div.card-content").each(function (i, obj) {
               $(this).text(intro_text[i]);
            })

        },
        error: function() {
            $('#notification-bar').text('An error occurred');
        }
        });

        /*
        for(var i = 0; i < page_ids.length; i++){
            var src = parsed_data['images']['query']['pages'][page_ids[i]]['thumbnail']['source'];
             $("div.card-image").children("img").each(function (i, obj) {
               $(this).attr("src", src);

            });
            console.log(src);


$("document").ready(function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        console.log(vars);
        var search_query = vars['search'];
        $.ajax({
                url: "/ajax/search",
                method: "GET",
                data: {"search": search_query},
                dataType: "json",
                success: function (data) {
                    console.log("Success")
                },
                error: function() {
                    $('#notification-bar').text('An error occurred');
                }
            })

    });

$("document").ready(function () {
    $(".search-result").click(function (e) {
        e.preventDefault();
        console.log($(this).text());
        var page = $(this).text();
        $.ajax({
            url: "/ajax/data",
            method: "GET",
            data: {"page": page},
            dataType: "json",
            success: function (data) {
                $("#wiki-data").html(data);
            },
            error: function() {
                $('#notification-bar').text('An error occurred');
            }
        })
    });
});

$.get("/ajax/search",{"search": search_query},"text", function (data) {
       console.log("Success")
    })

TODO https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
TODO https://realpython.com/blog/python/django-and-ajax-form-submissions/
TODO https://stackoverflow.com/questions/20306981/how-do-i-integrate-ajax-with-django-applications


$("document").ready(function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    var page = vars['page'];
        $.ajax({
            url: "/ajax/data",
            method: "GET",
            data: {"page": page},
            dataType: "json",
            success: function (data) {
                $("#wiki-data").html(data);
            },
            error: function () {
                $('#notification-bar').text('An error occurred');
            }
        })
});
*/