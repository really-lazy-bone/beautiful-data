'use strict';


// Declare app level module which depends on filters, and services
angular.module('lazyApp', [
  'ngRoute',
  'lazyApp.services'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
