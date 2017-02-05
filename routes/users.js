var express = require('express');
var redis = require('redis');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query.name) {	  
	  req.app.redis.hset('Log events', req.query.name, req.query.name, redis.print);
	  req.app.redis.hset('Timestamps', req.query.name, new Date().toTimeString(), redis.print);
	  
	  req.app.redis.expire('Log events', 180);
	  req.app.redis.expire('Timestamps', 180);
  };
  
  if (req.query.name && req.query.lat && req.query.lng) {
	  req.app.redis.geoadd('locations', req.query.lat, req.query.lng, req.query.name, function (err) {
	    console.log('GEOADD error ' + err);
      });
  };

  res.render('users', { title: 'Users' });
});

module.exports = router;
