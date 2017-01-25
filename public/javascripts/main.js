//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.pathName = window.location.pathname;

$(document).ready(function() {
    populateMarkers(MAPAPP.pathName);
	displayTime();
	displayMarker();
});

//Display time
function displayTime() {
    var socket = io();
    var el = document.getElementById('server-time');

    socket.on('time', function(timeString) {
      el.innerHTML = 'Server time: ' + timeString.time;
    });
};

//Display marker
function displayMarker() {
    var socket = io();

    socket.on('marker', function(marker) {
	  createMarker(marker);
    });
};

//Initialize our Google Map
function initialize(lat,lng) {
    var center = new google.maps.LatLng(lat,lng);
    var mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
    };
    this.map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
};

// Fill map with markers
function populateMarkers(dataType) {
    apiLoc = typeof apiLoc !== 'undefined' ? apiLoc : '/data/markers.json';
    // jQuery AJAX call for JSON
    $.getJSON(apiLoc, function(data) {
        //For each item in our JSON, add a new map marker
        $.each(data, function(i, ob) {
			if (i == 0) {
				initialize(ob.location.coordinates[0], ob.location.coordinates[1]);
			};
            createMarker (ob);
        });
    });
};

//Create marker
function createMarker(shop) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(shop.location.coordinates[0], shop.location.coordinates[1]),
        shopname: shop.shopname,
        details: shop.details,
        website: shop.website,
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
//Build the content for InfoWindow
    var content = '<h1 class="mt0"><a href="' + marker.website + '" target="_blank" title="' + marker.shopname + '">' + marker.shopname + '</a></h1><p>' + marker.details + '</p>';
	marker.infowindow = new google.maps.InfoWindow({
    	content: content,
    	maxWidth: 400
    });
//Add InfoWindow
    google.maps.event.addListener(marker, 'click', function() {
        if (MAPAPP.currentInfoWindow) MAPAPP.currentInfoWindow.close();
        marker.infowindow.open(map, marker);
        MAPAPP.currentInfoWindow = marker.infowindow;
    });
    MAPAPP.markers.push(marker);
};
