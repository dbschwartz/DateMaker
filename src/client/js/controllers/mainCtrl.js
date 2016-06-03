
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
   $scope.onClick = function(marker, eventName, model){

      // console.log('marker', marker);
      // console.log('eventName', eventName);
      // console.log('model', model);
      model.show = !model.show;
      $scope.yelpList.yelp.forEach(function(item){
        if(model.id!=item.id && item.show){
          item.show = false;
        }
      });
   }

    $scope.getYelpList= function(reqbody){
      apiService.getYelpList(reqbody)
      .then(function(yelpList){
        yelpList=yelpList.data.data;
        var tempList=[];
        console.log('yelpList1st', yelpList);
        yelpListings = yelpList.yelp.businesses;
        yelpListings.forEach(function(element){
          var obj = {};
          obj.id = element.id;
          obj.coords = {};
          obj.templateParameter = {};
          obj.coords.latitude = element.location.coordinate.latitude;
          obj.coords.longitude = element.location.coordinate.longitude;
          obj.templateParameter.name =element.name;
          obj.templateParameter.rating_img_url = element.rating_img_url;
          obj.templateParameter.categories = element.categories[0][0];
          obj.templateParameter.snippet_text = element.snippet_text;
          obj.templateParameter.address = element.location.display_address.join();
          obj.templateParameter.display_phone = element.display_phone;
          obj.templateUrl = '../templates/infowindow.html';
          obj.show = false;
          obj.isIconVisibleOnClick = true;
          obj.closeClick = function(){};
          tempList.push(obj);
        });
        yelpList.yelp = tempList;
        console.log('yelpList', yelpList);
        $scope.yelpList = yelpList;

        //console.log('yelpList', $scope.yelpList);
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
