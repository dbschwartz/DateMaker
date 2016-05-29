var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex.js');
var request = require('request');
var axios = require('axios')  
var helpers = require("../helpers");


// client.search({
//   term: "coffee",
//   ll: "39.69886992816584,-104.9523758212663"
//   }).
//     then(function (data) {
//       console.log(data);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });

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
        helpers.getLatLngCenter(addresses)                 
        return res.status(200).json({
         status: 'success',
         data: addresses
         });
      }))
      .catch(function(err){
      next(err);
    });
});

  // var p1=request({
  //   url: 'https://maps.googleapis.com/maps/api/geocode/json',
  //   qs: {address: address1, key: process.env.GMAPS_KEY},
  //   method: 'GET'
  // },   function(error, response, body){
  //  // console.log('response1', response);
  //   return response
  //   if(error) {
  //       // console.log(error);
  //   } else {
  //       // console.log(response.statusCode, body);
  //   }
  // });

  // var p2= request({
  //   url: 'https://maps.googleapis.com/maps/api/geocode/json',
  //   qs: {address: address2, key: process.env.GMAPS_KEY},
  //   method: 'GET'
  // },   function(error, response, body){
  //   console.log('reponse2 ', response.body.results);
  //   console.log('body ', body);
  //   return response
  //   if(error) {
  //       // console.log(error);
  //   } else {
  //       // console.log(response.statusCode, body);
  //   }
  // });

  // Promise.all([p1,p2])
  //   .then(function(coordinates){
  //       // console.log('coordinates!!',coordinates);
  //    return res.status(200).json({
  //       status: 'success',
  //       data: coordinates
  //     });
  //   })
  //   .catch(function(err){
  //     next(err);
  //   });





module.exports = router;
