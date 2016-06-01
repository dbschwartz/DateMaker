
var merge = require('merge');
var yelp = require("node-yelp-api");
var options = {
    "consumer_key": process.env.CONSUMER_KEY,
    "consumer_secret": process.env.CONSUMER_SECRET,
    "token": process.env.TOKEN,
    "token_secret": process.env.TOKEN_SECRET
};


function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in 
 *   degrees.
 */


module.exports = {

  getLatLngCenter: function getLatLngCenter(latLngInDegr) {
    var LATIDX = 0;
    var LNGIDX = 1;
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i=0; i<latLngInDegr.length; i++) {
        var lat = degr2rad(latLngInDegr[i][LATIDX]);
        var lng = degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    var avgX = sumX / latLngInDegr.length;
    var avgY = sumY / latLngInDegr.length;
    var avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);
    console.log([rad2degr(lat), rad2degr(lng)]);
    return ([rad2degr(lat), rad2degr(lng)]);  
  },
  searchYelp: function(coordinates, searchTerm){
   console.log('searchYelp searchTerm', searchTerm);
   console.log('serachYelp coordinates', coordinates);
    var parameters = {
        term: searchTerm,
        ll: coordinates
    }
    return new Promise(
        function(resolve, reject) {
            yelp.search(merge(options, parameters), function(error, response, body) 
             {
                console.log(body);
                resolve(body)
              }, function (err) {
                            console.error(err);
                            reject(err)
                            });
   
        }
    )
  }
}

