$("document").ready(function () {

    $(".search-result").click(function (e) {
        e.preventDefault();
        console.log($(this).text());
        var page = $(this).text();
        $.ajax({
            url: "/ajax/test/",
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


/*
var menuId = $("ul.nav").first().attr("id");
var request = $.ajax({
  url: "script.php",
  type: "POST",
  data: {id : menuId},
  dataType: "html"
});

request.done(function(msg) {
  $("#log").html( msg );
});

request.fail(function(jqXHR, textStatus) {
  alert( "Request failed: " + textStatus );
});



$("#search-result").click(function (e) {
    e.preventDefault();
    var request = $.ajax({
        url: "/test/",
        type: "POST",
        data: $(this).text()}
        success: function(result) {

        })


});
*/