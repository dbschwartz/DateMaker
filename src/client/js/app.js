var app = angular.module('dateMaker', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ngRoute', 'uiGmapgoogle-maps', 'duScroll']);
app.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAzaOc_wfgH247EN_Sxtfv7bqpzW7ppDNM',
    v: '3.23',
    libraries: 'weather,geometry,visualization'
  });
});