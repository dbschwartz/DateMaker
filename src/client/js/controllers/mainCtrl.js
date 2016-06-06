
angular.module('dateMaker')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'apiService', 'uiGmapGoogleMapApi', 'uiGmapIsReady', '$location', '$anchorScroll', '$document', '$timeout'];

function mainCtrl($scope, apiService, uiGmapGoogleMapApi, uiGmapIsReady, $location, $anchorScroll, $document, $timeout) {
  
     




   $scope.onClick = function(marker, eventName, model){

      // console.log('marker', marker);
      // console.log('eventName', eventName);
      // console.log('model', model);
      model.show = !model.show;
      function test(){
      var listingsContainer = angular.element(document.getElementById('listings-table'));
      var listingsElement = angular.element(document.getElementById(model.id).previousElementSibling);

      listingsContainer.scrollToElementAnimated(listingsElement,100).then(function(){
        console.log('test');
      }) 
      }
      var pointer;
      
       //var cool2 = angular.element(document.getElementById(thing).previousSibling);
      $scope.yelpList.yelp.forEach(function(item, index){
        if(model.id===item.id){
          pointer = item.id;
          console.log(item.id)
          
          item.open = open;
        }
        if(model.id!=item.id && item.show){
          item.show = false;
        }
      });

      $timeout(test, 250)

      
     
   }

    $scope.getYelpList= function(reqbody){
      apiService.getYelpList(reqbody)
      .then(function(yelpList){
        yelpList=yelpList.data.data;
        var tempList=[];
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
          obj.templateParameter.snippet_image_url = element.image_url;
          obj.templateParameter.url = element.url;
          obj.templateUrl = '../templates/infowindow.html';
          obj.show = false;
          obj.open = false;
          obj.isIconVisibleOnClick = true;
          obj.closeClick = function(){};
          tempList.push(obj);
        });
        yelpList.yelp = tempList;
        console.log('yelpList', yelpList);
        $scope.yelpList = yelpList;

        //console.log('yelpList', $scope.yelpList);
        center = {
          lat: parseFloat ($scope.yelpList.waypoints[1].coords.latitude),
          long: parseFloat  ($scope.yelpList.waypoints[1].coords.longitude)
        }
        console.log('center',center)
        $scope.map = {
          center : {
            latitude: center.lat, 
            longitude: center.long 
          },
          zoom : 10,
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
