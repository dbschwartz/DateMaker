
angular.module('dateMaker')
  .controller('mainCtrl', mainCtrl);

mainCtrl.$inject = ['$scope', 'apiService'];

function mainCtrl($scope, apiService) {
  

  $scope.getCoordinates = function(addresses){
    apiService.getCoordinates(addresses)
    .then(function(coordinates){
        console.log(cooridnates);
    })
    .catch(function(err){
      console.log(err);
    });
    this.addresses =[];
  };
}

