angular.module('dateMaker')
  .config(routeConfig);


routeConfig.$inject = ['$routeProvider'];


function routeConfig($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'mainCtrl'
    })
    .otherwise('/');
}
