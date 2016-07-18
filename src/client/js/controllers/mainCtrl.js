
angular.module('dateMaker')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'apiService', 'uiGmapGoogleMapApi',  '$anchorScroll', '$document', '$timeout'];

function mainCtrl($scope, apiService, uiGmapGoogleMapApi, $anchorScroll, $document, $timeout) {
  

   $scope.onClick = function(marker, eventName, model){

      
      model.show = !model.show;
      function scroll(){
        var listingsContainer = angular.element(document.getElementById('listings-table'));
        
        listingsElement = angular.element(document.getElementById(model.id));
        listingsContainer.scrollToElementAnimated(listingsElement,100).then(function(){
        });   
      }

      
      $scope.yelpList.yelp.forEach(function(item, index){
        if(model.id===item.id){          
          item.open = open;
        }
        if(model.id!=item.id && item.show){
          item.show = false;
        }
      });

      $timeout(scroll, 500)

      
     
   }

    $scope.getYelpList= function(reqbody){
      apiService.getYelpList(reqbody)
      .then(function(yelpList){
        yelpList=yelpList.data.data;
        var tempList=[];
        yelpListings = yelpList.yelp.businesses;
        yelpListings.forEach(function(element){ // object literal or callback function, better name for variable
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

     
        center = {
          lat: parseFloat ($scope.yelpList.waypoints[1].coords.latitude),
          long: parseFloat  ($scope.yelpList.waypoints[1].coords.longitude)
        }
        $scope.map = {
          center : {
            latitude: center.lat, 
            longitude: center.long 
          },
          zoom : 10,
          control : {}
        };      


    }) 
    .catch(function(err){
      console.log(err);
    });
  
    
 
  }


};
