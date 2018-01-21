$("document").ready(function () {
   var parsed_data = JSON.parse(json_page_data);
    $("#wiki-data").html(parsed_data);
    //$('p').addClass("flow-text");

    $('a[title]').each(function(){
        this.href = this.href.replace("/wiki/", "/view/?page=");
    });

    $('div[ aria-labelledby]').each(function () {
        this.remove();
    });

    $('table.mbox-small').each(function () {
    this.remove();
    });

    $('h2').each(function () {
    //this.addClass("section");
    });

    $('span.mw-headline').addClass('section scrollspy');

    $('div.toc').children('ul').addClass('section table-of-contents');

    $('img').each(function () {
        $(this).addClass('materialboxed');
        $(this).removeClass('thumbnail');
        $(this).removeAttr('srcset');
        $(this).removeAttr('width');
        $(this).removeAttr('height');
        //$(this).addClass('col s12 m6 l12');

    });

    $('div.thumbinner').each(function () {
        $(this).attr('style', 'width:400px;');
        $(this).addClass('parallax-container');
    });

    $('div.material-placeholder').each(function () {
        console.log();
        $(this).addClass('parallax');
    });

    $('img[src]').each(function () {
        var patt = new RegExp('(\\/\\d\\w+-)');
        this.src = this.src.replace(patt, '/400px-');
    });

    $('a.image').each(function () {
        var img = this.firstElementChild;
        $(this).removeAttr('href');
    });

    $('.scrollspy').scrollSpy();
    $('.materialboxed').materialbox();
    $('.parallax').parallax();

});
// TODO In order to get all images in their original resolution you need to make an
// TODO API call for each image
// TODO https://en.wikipedia.org/w/api.php?action=query&titles=File:Georges_Braque,_1909-10,_La_guitare_(Mandora,_La_Mandore),
// TODO _oil_on_canvas,_71.1_x_55.9_cm,_Tate_Modern,_London.jpg&prop=imageinfo&iiprop=url&format=json
