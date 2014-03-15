'use strict';


// Declare app level module which depends on filters, and services
angular.module('lazyApp', [
  'ngRoute',
  'ngResource',
  'google-maps',
  'lazyApp.services',
  'lazyApp.directives',
  'angulartics',
  'angulartics.google.analytics'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: '/app/partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/location', {templateUrl: '/app/partials/location.html', controller: 'LocationCtrl'});
  $routeProvider.when('/tag', {templateUrl: '/app/partials/tag.html', controller: 'TagCtrl'});
  $routeProvider.when('/time', {templateUrl: '/app/partials/time.html', controller: 'TimeCtrl'});
  $routeProvider.when('/map', {templateUrl: '/app/partials/map.html', controller: 'MapCtrl'});
  $routeProvider.when('/region', {templateUrl: '/app/partials/region.html', controller: 'RegionCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
