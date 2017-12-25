$(".search-result").click(function () {
    console.log($(this).text())
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