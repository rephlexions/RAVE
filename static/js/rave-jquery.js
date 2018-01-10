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
    var search_query = getUrlParameter('search');

    $.ajax({
        url: "/ajax/search",
        method: "GET",
        data: {"search": search_query},
        dataType: "json",
        success: function (data) {
            console.log(data);
            $("span.card-title").each(function (i, obj) {
               $(this).text(data[i])
            });
        },
        error: function() {
            $('#notification-bar').text('An error occurred');
        }
        });

});

/*
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