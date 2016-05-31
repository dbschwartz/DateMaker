//Declaration of API Service
angular.module('dateMaker')
  .service('apiService', apiService);

// ** crud Service **

//Dependency Injection

apiService.$inject = ['$http'];

// Declaration of the API Service Function

function apiService($http) {

  return {

    getCoordinates: function(addresses){
      return $http.post('/getcoordinates', addresses)
        .then(function(res){
          console.log('res',res);
          return res;
        })
        .catch(function(err){
          return err;
        });
    }
  
  };
}