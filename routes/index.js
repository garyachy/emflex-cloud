var express = require('express');
var redis = require('redis');
var router = express.Router();

function createCallback(app,marker,name) {
    return function() {
      app.redis.geopos('locations', name, function(err, reply) {
		console.log('Name is ' + name);
	    console.log('Coordinates are ' + reply);
		marker.name = name;
		marker.location.coordinates[0]=reply[0][0];
		marker.location.coordinates[1]=reply[0][1];
		app.io.emit('marker', marker);
      });
    }
};

function populateMarkers(marker, app) {
	app.redis.hgetall('Log events', function (err, replies) {
	    for(i in replies) {
            createCallback(app,marker,i)();
        };
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var myMarker = {
		"location":{
			"type": "Point",
			"coordinates": [0,0]
		},
		"details": "Bicycle",
		"website": "https://github.com/emflex"
	};

	function getTime() {
		var myObject = {
		    time: new Date().toTimeString()
		}
	    return myObject;
	}
  
    setInterval(() => populateMarkers(myMarker, req.app), 5000);

	setInterval(() => req.app.io.emit('time', getTime()), 1000);
	
    res.render('index', { title: 'Express' });
});

module.exports = router;
