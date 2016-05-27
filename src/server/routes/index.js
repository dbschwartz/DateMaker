var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex.js');
var request = require('request');
var yelp = require("node-yelp");
var client = yelp.createClient({
  oauth: {
    "consumer_key": process.env.CONSUMER_KEY,
    "consumer_secret": process.env.CONSUMER_SECRET,
    "token": process.env.TOKEN,
    "token_secret": process.env.TOKEN_SECRET
  }
});

client.search({
  term: "coffee",
  ll: "39.69886992816584,-104.9523758212663"
  }).
    then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });

router.get('/', function(req, res, next) {
  res.sendFile('/index.html');
});
  

router.get('/getcoordinates', function(req, res, next) {
 
  var address1 = req.body.address1.split(' ').join('+');
  var address2 = req.body.address2.split(' ').join('+');
  var p1=request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {address: address1, key: process.env.GMAPS_KEY},
    method: 'GET'
  },   function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });

  var p2= request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {address: address2, key: process.env.GMAPS_KEY},
    method: 'GET'
  },   function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });

  Promise.all([p1,p2])
    .then(function(coordinates)){
     res.status(200).json({
      status: 'success',
      data: coordinates
      });
    })
    .catch(function(err){
      next(err);
    });
}




module.exports = router;
