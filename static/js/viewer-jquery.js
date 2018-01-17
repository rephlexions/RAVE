$("document").ready(function () {
   var parsed_data = JSON.parse(json_page_data);
    console.log(parsed_data);
    $("#wiki-data").html(parsed_data);
    $("p").addClass("flow-text");
    $('a[title]').each(function(){
        this.href = this.href.replace("/wiki/", "/view/?page=");
});
});
// TODO In order to get all images in their original resolution you need to make an
// TODO API call for each image
// TODO https://en.wikipedia.org/w/api.php?action=query&titles=File:Georges_Braque,_1909-10,_La_guitare_(Mandora,_La_Mandore),
// TODO _oil_on_canvas,_71.1_x_55.9_cm,_Tate_Modern,_London.jpg&prop=imageinfo&iiprop=url&format=json
