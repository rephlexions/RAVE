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

    // Initiate Slider 
    $('div.slider').slider({
        height: 200,
        indicators: false,
        interval: 3000,
    });

});
