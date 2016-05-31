
angular.module('dateMaker')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'apiService'];

function mainCtrl($scope, apiService) {
  

  $scope.getCoordinates = function(reqbody){
    apiService.getCoordinates(reqbody)
    .then(function(coordinates){
        console.log(coordinates);
    })
    .catch(function(err){
      console.log(err);
    });
    this.addresses =[];
  };
}

