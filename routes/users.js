var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query.name && req.query.lat && req.query.lng) {
	  
	  var myMarker = {
	  	"shopname": req.query.name,
	  	"location":{
	  		"type": "Point",
	  		"coordinates": [req.query.lat,req.query.lng]
	  	},
	  	"details": "Great for a coffee on the go.",
	  	"website": "http://www.oldcitycoffee.com/"
	  };
	  
	  req.app.io.emit('marker', myMarker); 
  };

  res.send('respond with a resource');
});

module.exports = router;
