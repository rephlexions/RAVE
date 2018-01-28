$('document').ready(function () {

   var parsed_data = JSON.parse(json_page_data);
    $("#wiki-data").html(parsed_data);

    //$('p').addClass("flow-text");

    $('a[title]').each(function(){
        this.href = this.href.replace("/wiki/", "/view/?page=");
    });
    $('div[ aria-labelledby]').each(function () {
        $(this).remove();
    });
    $('table.infobox').removeAttr('style');

    //Scrollspy
    //Remove toclevel-2 elements from the ToC
    $('ul').children('li.toclevel-2').each(function () {
       $(this).remove();
    });
    $('h2').each(function () {
        $(this).addClass("section");
        //$(this).append('<div class="divider"></div>')
    });
    $('span.mw-headline').addClass('scrollspy');
    $('div.toc').children('ul').addClass('section table-of-contents');
    $('div.toc').appendTo('#scrollspy-table');
    $('div.toctitle').children('h2').hide();

    //Page cleaning
    $('table.mbox-small').each(function () {
        $(this).remove();
    });
    $('table.plainlinks').remove();
    $('table.vertical-navbox').remove();
    $('table.wikitable').remove();
    $('div.navigation-not-searchable').remove();

    //Images
    $('img').each(function () {
        $(this).addClass('materialboxed');
        $(this).removeClass('thumbnail');
        $(this).removeAttr('srcset');
        $(this).removeAttr('width');
        $(this).removeAttr('height');
        $(this).addClass('responsive-img');
    });

    $('div.thumbinner').each(function () {
        $(this).removeAttr('style');
        $(this).addClass('z-depth-1')
        //$(this).attr('style', 'width:500px height:668.3;');
        //$(this).addClass('parallax-container');
    });
    /*
    $('div.material-placeholder').each(function () {
        $(this).addClass('parallax');
    });
    */
    //Get bigger images
    $('img[src]').each(function () {
        var patt = new RegExp('(\\/\\d\\w+-)');
        this.src = this.src.replace(patt, '/500px-');
    });

    $('a.image').each(function () {
        var img = $(this).firstElementChild;
        $(this).removeAttr('href');
    });

    $('div.thumb').each(function () {
        var img =  $(this).children('img');

    });

    //Initialize Materialize effects
    $('.scrollspy').scrollSpy();
    //$('.materialboxed').materialbox();
    //$('.parallax').parallax();

});
// TODO In order to get all images in their original resolution you need to make an
// TODO API call for each image
// TODO https://en.wikipedia.org/w/api.php?action=query&titles=File:Georges_Braque,_1909-10,_La_guitare_(Mandora,_La_Mandore),
// TODO _oil_on_canvas,_71.1_x_55.9_cm,_Tate_Modern,_London.jpg&prop=imageinfo&iiprop=url&format=json
