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
                console.log(data);
                $("#wiki-data").html(data);
            },
            error: function() {
                $('#notification-bar').text('An error occurred');
            }
        })
    });
});

/*
# TODO https://simpleisbetterthancomplex.com/tutorial/2016/08/29/how-to-work-with-ajax-request-with-django.html
*/
