// Buttons Creation
$(function () {
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("Page Loaded") // buttons populates onces page loads 
})


//Button Options
var searchArray = ['NBA', 'MAVS', 'LEBRON', 'GOLDEN STATE', 'MVP', 'NBA FINALS', 'Basketball' ];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty(); // this is empty so we can add a new button - no button is duplicated unless you user types in the same thing 
    for (var i = 0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}
// function works so when user clicks button or searches - the user gets unique search under their search 
$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=ies4YcC4h6xwSTSAtEPCuvZp6Y6StufM';  


    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating; 
                var p = $('<p>').text('Rating: ' + rating); // rating as PG etc

                // below var animated & still - creatin both versions of gif
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                // modifying va image below
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');// = to string of still - not ref a URL
                image.addClass('searchImage');
                // below is adding above to searchDiv 
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })

})

$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('stll'));
        $(this).attr('data-state', 'still');
    }
})
// adding new buttons  option below 
$('#addSearch').on('click', function () {
    var newSearch = $('input').val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    return false; // this is returning false since the input type of submit keeps reloading page 
    // return false - prevents from reloading page 
})