'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('lazyApp.services', []).
  value('version', '0.1').
  value('months',
  	[
  	'january',
  	'february',
  	'march',
  	'april',
  	'may',
  	'june',
  	'july',
  	'august',
  	'september',
  	'october',
  	'november',
  	'december'
  ]).
  factory('Resources', function($resource) {
    return $resource('/_ah/api/flickr/:version/:data/:model/:field/:operation',
        {
        	version: 'v1'
        },
        {
        	getPhotoMonthly:
        	{
        		method: 'GET',
        		params: { data: 'photo' }
        	},
          getPhotoStatistic:
          {
            method: 'GET',
            params: { data: 'photo' }
          }
        }
    );
  });
