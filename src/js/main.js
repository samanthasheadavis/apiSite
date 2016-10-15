// -- API KEYS -- //

var googleUser = {
    apiKey: 'AIzaSyCU2Fp6SIYAD--ig0VwHGaRA-b9yS6M27k'
};
var edamamUser = {
    apiKey: '056dd4e3421549d9992138a4d933d4c3',
    appId: '57d50a85'
};

// -- HANDLEBARS SETUP -- //
var buildMe = {

    generateTemplate: function(pageTemplate) {
        var source = $(pageTemplate).html();
        var template = Handlebars.compile(source);
        var context = {};
        var html = template(context);
        $('#templates-container').fadeOut('fast', function() {
            $('#templates-container').html('').prepend(html).fadeIn('fast', function() {
                updateHash(pageTemplate);
                if (pageTemplate === '#maps-template') {
                    initMap();
                } else if (pageTemplate === '#recipe-template') {
                    initRecipe();
                }
            });
        });

    },

    triggerTemplate: function() {

        $('#container').on('click', '.home', function(event) {
            buildMe.generateTemplate('#home-template');
        });
        $('#container').on('click', '.social', function(event) {
            buildMe.generateTemplate('#social-template');
        });
        $('#container').on('click', '.maps', function(event) {
            buildMe.generateTemplate('#maps-template');
        });
        $('#container').on('click', '.recipe', function(event) {
            buildMe.generateTemplate('#recipe-template');
        });
    },
};


function updateHash(hash) {
    window.location.hash = hash;
}


// --- GOOGLE MAPS API CALL --- //
var map;
var infowindow;

// function that builds the map element on the page, gives it a central location and populates the search request for 'Red Lobster'
function initMap() {
    var rtp = {
        lat: 35.899168,
        lng: -78.863640
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: rtp,
        zoom: 10
    });

    // initializing the search request variable
    var request = {
        location: rtp,
        radius: '500',
        query: 'Red Lobster'
    };

    // initializing the infowindow that pops up.
    infowindow = new google.maps.InfoWindow();
    // service is the textSearch request pulling from the PlacesService library.
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

}
//loop that creates the map markers based on the search results.
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}
// function createMarker populates the markers on the map in the correct locations.
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    // adding the event listener so when a marker is clicked on, infowindow pops up
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + '<br>' + place.formatted_address + '<br>' + 'Rating: ' + String(place.rating));
        infowindow.open(map, this);
    });
}

// -- EDAMAM API CALL -- //

function initRecipe() {
    $.ajax({
        type: 'GET',
        url: "https://api.edamam.com/search?q=cheddar+bay+biscuits&app_id=" + edamamUser.appId + "&app_key=" + edamamUser.apiKey,
        headers: 'application/json',
        dataType: 'jsonp',
        success: function(response) {
            recipeSlider(response);
        }
    });
}

function recipeSlider(response) {
  //starts at 1 because the first recipe image link is dead
    var count = 1;
    new Recipe(response.hits[count].recipe);
    $('#templates-container').on('click', '#plus', function() {
        count++;
        new Recipe(response.hits[count].recipe);
    });
}

function deleteRecipe() {
    $('#templates-container').on('click', '#delete', function() {
       $(this).parents('.recipe-container').remove();
    });
}

function showIngredients() {
  $('#templates-container').on('click', '#showIngredients', function() {
    console.log(this);
    $(this).siblings('ul').slideToggle();
  });
}

function Recipe(recipeObject) {
    var source = $('#recipe').html();
    var template = Handlebars.compile(source);
    var context = {
        name: recipeObject.label,
        img: recipeObject.image,
        ingredient: recipeObject.ingredientLines,
        url: recipeObject.url
    };
    var html = template(context);
    $('#recipes').prepend(html);
}


function init() {

    buildMe.triggerTemplate();
    buildMe.generateTemplate('#home-template');
    deleteRecipe();
    showIngredients();

    if (window.location.hash.length > 0) {
        var page = window.location.hash;
        buildMe.generateTemplate(page);
    }

}

init();
