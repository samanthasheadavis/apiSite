var googleUser = {
    apiKey: 'AIzaSyCU2Fp6SIYAD--ig0VwHGaRA-b9yS6M27k'
};
var twitterUser = {
    apiKey: null
};

var buildMe = {

    generateTemplate: function(pageTemplate) {
        var source = $(pageTemplate).html();
        var template = Handlebars.compile(source);
        var context = {
            //context here
        };
        var html = template(context);
        $('#templates-container').fadeOut('fast', function() {
            $('#templates-container').html('').prepend(html).fadeIn();
        });
        //
        // $('#templates-container').fadeOut('fast', function() {
        //  });
    },

    triggerTemplate: function() {

        $('#container').on('click', '.home', function(event) {
            buildMe.generateTemplate('#home-template');
        });
        $('#container').on('click', '.social', function(event) {
            buildMe.generateTemplate('#social-template');
            console.log('social');
        });
        $('#container').on('click', '.maps', function(event) {
            buildMe.generateTemplate('#maps-template');
            console.log('maps');
        });
        $('#container').on('click', '.recipe', function(event) {
            buildMe.generateTemplate('#recipe-template');
            console.log('recipes');
        });
    },
};
var map;
var infowindow;

function initMap() {
    var rtp = {
        lat: 35.914224,
        lng: 78.865230
    };

    map = new google.maps.Map($('.maps-container'), {
        center: rtp,
        zoom: 25
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
            location: rtp,
            radius: 500,
            type: ['Red Lobster']
        },
        callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
  infowindow.setContent(place.name);
  infowindow.open(map, this);
});
}

$.ajax({
  url: 'https://maps.googleapis.com/maps/api/js?key=' + googleUser.apiKey + '&libraries=places&callback=initMap',
  type: 'GET',
  dataType: 'jsonp'
});

// $.get('https://maps.googleapis.com/maps/api/js?key=' + googleUser.apiKey + '&libraries=places&callback=initMap');
// add error handling here



buildMe.triggerTemplate();
buildMe.generateTemplate('#home-template');
// twitter();
