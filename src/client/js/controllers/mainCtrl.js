
angular.module('dateMaker')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'apiService', 'uiGmapGoogleMapApi', 'uiGmapIsReady'];

function mainCtrl($scope, apiService, uiGmapGoogleMapApi, uiGmapIsReady) {
  
   // $scope.map = {
   //      center : {
   //          latitude: 37.7749295, 
   //          longitude: -122.4194155 
   //      },
   //      zoom : 14,
   //      control : {}
   //  };


    $scope.getYelpList= function(reqbody){
      apiService.getYelpList(reqbody)
      .then(function(yelpList){
        $scope.yelpList = yelpList.data.data;
        console.log('yelpList', $scope.yelpList);
        center = {
          lat: parseFloat ($scope.yelpList.midpoint.latitude),
          long: parseFloat  ($scope.yelpList.midpoint.longitude)
        }
        console.log('center',center)
        $scope.map = {
          center : {
            latitude: center.lat, 
            longitude: center.long 
          },
          zoom : 9,
          control : {}
        }; 

        $scope.markers =  [{id:1, coords:{latitude:center.lat, longitude:center.long}, options: {label:"test"}}, {id:2, coords:{latitude:$scope.yelpList.address1[0], longitude:$scope.yelpList.address1[1]},options:{label:"demo"}}];
      
    //   uiGmapIsReady.promise()
    // .then(function (map_instances) {
    //     var map1 = $scope.map.control.getGMap();    // get map object through $scope.map.control getGMap() function
    //     var map2 = map_instances[0].map;  
    //     $scope.map = {
    //     center : {
    //         latitude: $scope.yelpList.midpoint[0], 
    //         longitude: $scope.yelpList.midpoint[1] 
    //     },
    //     zoom : 14,
    //     control : {}
    // };          // get map object through array object returned by uiGmapIsReady promise
    //     alert('map is now ready');
    //     if(map1 === map2){
    //         alert('map1 object is the same as map2 object');
    //     }

    }) 
    .catch(function(err){
      console.log(err);
    });
    // this.addresses =[];
    
 
  }
};
