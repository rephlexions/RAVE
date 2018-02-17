$('document').ready(function () {

    var parsed_data = JSON.parse(json_page_data);
    var wiki_data = parsed_data['wiki'];
    $("#wiki-data").html(wiki_data).addClass("flow-text");

    // Do not redirect to Wikipedia
    $('a[title]').each(function(){
        this.href = this.href.replace("/wiki/", "/view/?page=");
    });

    $('div[aria-labelledby]').each(function () {
        $(this).remove();
    });

    $('table.infobox').removeAttr('style');
    $('#navbar-form').show();

    // Add topic title at the top of page
    var pageTitle = getUrlParameter('page');
    var titleHeading = '<h1>' + pageTitle + '</h1>';
    $('div.mw-parser-output').prepend(titleHeading);

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
    $('#External_links').closest('h2').siblings('ul').remove();
    $('#External_links').closest('h2').remove();

    //Images
    $('img').each(function () {
       // $(this).addClass('materialboxed');
        $(this).removeClass('thumbnail');
        $(this).removeAttr('srcset');
        $(this).removeAttr('width');
        $(this).removeAttr('height');
        $(this).addClass('responsive-img');
    });

    //Set size of image container based in the size of image
    $('img.thumbimage').on('load', function () {
        var width = this.clientWidth;
        var height = this.clientHeight;
        $(this).closest('div.thumbinner').width(width).height(height + $(this).siblings('div.thumbcaption').height);

    });

    // Add shadow effect to the image container
    $('div.thumbinner').each(function () {
        $(this).removeAttr('style');
        $(this).addClass('z-depth-1');
    });

    //Get bigger images
    $('img[src]').each(function () {
        var patt = new RegExp('(\\/\\d\\w+-)');
        this.src = this.src.replace(patt, '/500px-');
    });

    $('a.image').each(function () {
        $(this).removeAttr('href');
    });

    //Initialize Materialize effects
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible();
    $('.tabs').tabs();

    // Fill the Crossref tab with data
    if(parsed_data['crossref'] !== null){
        $('li.disabled').removeClass('disabled');
        var crossref_data = JSON.parse(parsed_data['crossref']);
        var items = crossref_data['message']['items'];

        $('div.crossref-card').each(function (i){

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