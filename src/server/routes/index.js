var express = require('express');
var router = express.Router();
var queries = require("../../../queries");
var knex = require('../../../db/knex.js');
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
  var address1 = req.body.address1
  var address2 = req.body.address2;


  queries.getMeals().then(function(meals){
    res.status(200).json({
      status: 'success',
      data: meals
    });
  })
  .catch(function(err){
    next(err);
  });
});


module.exports = router;
