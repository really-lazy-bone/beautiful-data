'use strict';


// Declare app level module which depends on filters, and services
angular.module('lazyApp', [
  'ngRoute',
  'ngResource',
  'google-maps',
  'lazyApp.services',
  'lazyApp.directives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/location', {templateUrl: 'partials/location.html', controller: 'LocationCtrl'});
  $routeProvider.when('/tag', {templateUrl: 'partials/tag.html', controller: 'TagCtrl'});
  $routeProvider.when('/time', {templateUrl: 'partials/time.html', controller: 'TimeCtrl'});
  $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: 'MapCtrl'});
  $routeProvider.when('/region', {templateUrl: 'partials/region.html', controller: 'RegionCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
