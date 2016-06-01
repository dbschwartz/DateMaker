
angular.module('dateMaker')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'apiService', 'uiGmapGoogleMapApi', 'uiGmapIsReady'];

function mainCtrl($scope, apiService, uiGmapGoogleMapApi, uiGmapIsReady) {
  
   $scope.map = {
        center : {
            latitude: 37.7749295, 
            longitude: -122.4194155 
        },
        zoom : 14,
        control : {}
    };


    $scope.getYelpList= function(reqbody){
      apiService.getYelpList(reqbody)
      .then(function(yelpList){
          $scope.yelpList = yelpList;
      uiGmapIsReady.promise()
    .then(function (map_instances) {
        var map1 = $scope.map.control.getGMap();    // get map object through $scope.map.control getGMap() function
        var map2 = map_instances[0].map;            // get map object through array object returned by uiGmapIsReady promise
        alert('map is now ready');
        if(map1 === map2){
            alert('map1 object is the same as map2 object');
        }
    $scope.yelpList = yelpList;

    })
      .catch(function(err){
        console.log(err);
      });
      this.addresses =[];
    
 
    }
  )};
}
