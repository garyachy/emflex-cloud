//Create a single global variable
var MAPAPP = {};
MAPAPP.markers = [];
MAPAPP.currentInfoWindow;
MAPAPP.pathName = window.location.pathname;

$(document).ready(function() {
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

var marker_counter = 0;

//Display marker
function displayMarker() {
    var socket = io();

    socket.on('marker', function(marker) {
		if(marker_counter == 0) {
			initialize(marker.location.coordinates[0], 
				marker.location.coordinates[1]);
		};
	  createMarker(marker);
	  marker_counter++;
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

//Create marker
function createMarker(object) {
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(object.location.coordinates[0], object.location.coordinates[1]),
        shopname: object.name,
        details: object.details,
        website: object.website,
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
