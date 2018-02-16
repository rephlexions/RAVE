$('document').ready(function () {

    function test() {
        console.log('test');
    }
    test();

    // TODO Add page Title
    var pagename = getUrlParameter('page');
    console.log(pagename);
    var htmltitle = '<h2>' + pagename + '</h2>';
    $('div.mw-parser-output').prepend(htmltitle);

    var parsed_data = JSON.parse(json_page_data);
    var wiki_data = parsed_data['wiki'];

    $("#wiki-data").html(wiki_data).addClass("flow-text");

    $('a[title]').each(function(){
        this.href = this.href.replace("/wiki/", "/view/?page=");
    });
    $('div[ aria-labelledby]').each(function () {
        $(this).remove();
    });
    $('table.infobox').removeAttr('style');
    $('#navbar-form').show();



    //Page cleaning
    $('table.mbox-small').each(function () {
        $(this).remove();
    });
    $('table.plainlinks').remove();
    $('table.vertical-navbox').remove();
    $('table.wikitable').remove();
    $('div.navigation-not-searchable').remove();
    $('ul.gallery').remove();
    $('div.reflist').remove();
    $('div.refbegin').remove();
    $('div.toc').remove();
    $('sup').remove();
    $('a.external').remove();
    $('div.portal').remove();
    $('#Gallery').remove();
    $('#Notes').remove();
    $('#References').remove();
    $('div.slider').hide();

    //Images
    $('img').each(function () {
       // $(this).addClass('materialboxed');
        $(this).removeClass('thumbnail');
        $(this).removeAttr('srcset');
        $(this).removeAttr('width');
        $(this).removeAttr('height');
        $(this).addClass('responsive-img');
    });
    $('img.thumbimage').on('load', function () {
        var width = this.clientWidth;
        var height = this.clientHeight;
        $(this).closest('div.thumbinner').width(width).height(height + $(this).siblings('div.thumbcaption').height);
        console.log($(this).closest('div.thumbinner'));
    });
    $('div.thumbinner').each(function () {
        $(this).removeAttr('style');
        $(this).addClass('z-depth-1');
    });
    //Get bigger images
    $('img[src]').each(function () {
        var patt = new RegExp('(\\/\\d\\w+-)');
        this.src = this.src.replace(patt, '/400px-');
    });
    $('a.image').each(function () {
        $(this).removeAttr('href');
    });

    //Initialize Materialize effects
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible();
    $('.tabs').tabs();

    /************************************************/
    if(parsed_data['crossref'] !== null){
        $('li.disabled').removeClass('disabled');
        var crossref_data = JSON.parse(parsed_data['crossref']);
        var items = crossref_data['message']['items'];

        $('div.crossref-card').each(function (i) {

            if(items[i].hasOwnProperty('author')){
                 var author = items[i]['author'][0]['given'] + ' ' + items[i]['author'][0]['family'];
                 $(this).find('p.crossref-author').text(author);
            }

            if(items[i].hasOwnProperty('publisher')){
                var publisher = items[i]['publisher'];
                $(this).find('p.crossref-publisher').text(publisher);
            }

            if(items[i].hasOwnProperty('title')){
                var title = items[i]['title'][0];
                $(this).find('span.card-title').text(title);
            }

            if(items[i].hasOwnProperty('URL')){
                var url = items[i]['URL'];
                $(this).find('a').attr('href', url);
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


/*  In order to get all images in their original resolution you need to make an
    API call for each image
    https://en.wikipedia.org/w/api.php?action=query&titles=File:Georges_Braque,_1909-10,_La_guitare_(Mandora,_La_Mandore),
    _oil_on_canvas,_71.1_x_55.9_cm,_Tate_Modern,_London.jpg&prop=imageinfo&iiprop=url&format=json
*/

/*
    //Get page name
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('#');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

 */