$(document).ready(function(){
    //TODO Resolve autocomplete
    $('input.autocomplete').autocomplete({
      data: {
        "Action painting": null,
        "Afrofuturism": null,
        "Google": 'https://placehold.it/250x250'
      },
    });
});