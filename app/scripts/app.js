'use strict';

angular.module('graphCmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'graphCmsApp.services'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);

  });