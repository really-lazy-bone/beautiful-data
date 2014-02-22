'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('lazyApp.services', []).
  value('version', '0.1').
  factory('Resources', function($resource) {
    return $resource('/:data/:resourceName', 
        {}, {}
    );
  }).
  factory('Util', function(){

      return {
          convertFlickrText: function(flickrText) {
              var text = flickrText.replace(/[\[\]\'&]+/g, '').trim();
              text = text.substring(1, text.length).toLowerCase();

              return text;
          }
      };
  });
