'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('lazyApp.services', []).
  value('version', '0.1').
  factory('Resources', function($resource) {
    return $resource('/_ah/api/flickr/:version/:model/:operation',
        {
        	version: 'v1'
        },
        {
        	getPhotoMonthly:
        	{
        		method: 'GET',
        		params: { model: 'photo' }
        	}
        }
    );
  });
