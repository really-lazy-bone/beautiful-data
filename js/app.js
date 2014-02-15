'use strict';


// Declare app level module which depends on filters, and services
angular.module('lazyApp', [
  'ngRoute',
  'ngResource',
  'lazyApp.services',
  'lazyApp.directives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/location', {templateUrl: 'partials/location.html', controller: 'LocationCtrl'});
  $routeProvider.when('/tag', {templateUrl: 'partials/tag.html', controller: 'TagCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
