var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex.js');
var axios = require('axios')  
var helpers = require("../helpers");


router.get('/', function(req, res, next) {
  res.sendFile('/index.html');
});
  

router.post('/getcoordinates', function(req, res, next) {
 
  var address1 = req.body.address1.split(' ').join('+');
  var address2 = req.body.address2.split(' ').join('+');
  function getCoordinates1() {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {address: address1,
                   key: process.env.GMAPS_KEY}});
  }
  function getCoordinates2(){
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {address: address2,
                   key: process.env.GMAPS_KEY}});
  }

  axios.all([getCoordinates1(), getCoordinates2()])
      .then(
        axios.spread(function(address1, address2) {
        var addresses = [[address1.data.results[0].geometry.location.lat, address1.data.results[0].geometry.location.lng],
                         [address2.data.results[0].geometry.location.lat, address2.data.results[0].geometry.location.lng]];
        var midway = helpers.getLatLngCenter(addresses);
        var midpoint={latitude: midway[0],
                      longitude: midway[1]};
        var midway = midway.join();
        var waypoints = [
           {
            id: "address1",
            coords: {
              latitude: addresses[0][0],
              longitude: addresses[0][1]
            },
            icon: "../templates/images/blue-dot.png",
            templateUrl: "../templates/waypointsinfowindow.html",
            templateParameter: {
              address: req.body.address1,
              name: "address1"
            },
            show: false,
            options: {
                      label: {
                            color:"black",
                            fontFamily:"Arial, Helvetica, sans-serif",
                            fontSize:"12px",
                            text: "1"}
            },
            isIconVisibleOnClick: true,
            closeClick: function(){}
          },
           {
            id: 'midpoint',
            coords: {
              latitude: midpoint.latitude,
              longitude: midpoint.longitude
            },
            icon: "../templates/images/green-dot.png",
            templateUrl: "../templates/waypointsinfowindow.html",
            templateParameter: {
              name: "midpoint"
            },
            show: false,
            options:{
                      label: {
                            color:"black",
                            fontFamily:"Arial, Helvetica, sans-serif",
                            fontSize:"12px",
                            text: "M"}
            },
            isIconVisibleOnClick: true,
            closeClick: function(){}
          },
           {
            id: 'address2',
            coords: {
              latitude: addresses[1][0],
              longitude: addresses[1][1]
            },
            icon: "../templates/images/blue-dot.png",
            templateUrl: "../templates/waypointsinfowindow.html",
            templateParameter: {
              address: req.body.address2,
              name: "address2"
            },
            show: false,
            options: {
                        label: {
                            color:"black",
                            fontFamily:"Arial, Helvetica, sans-serif",
                            fontSize:"12px",
                            text: "2"}
            },
            isIconVisibleOnClick: true,
            closeClick: function(){}
          }
        ];

        helpers.searchYelp(midway, req.body.term)
          .then(function(yelpList){
            formattedYelpList=yelpList;
           var response={waypoints: waypoints,
                         yelp: formattedYelpList

           };
              return res.status(200).json({
               status: 'success',
               data: response
              });
          })
          .catch(function(err){
            next(err);
          });
        }))
})

 


module.exports = router;
