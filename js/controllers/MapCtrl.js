angular.module('lazyApp').controller('MapCtrl',
    ['$scope', '$location', 'Resources', 'Util',
    function($scope, $location, Resources, Util) {

        $scope.map = {
            center: {
                latitude: 40,
                longitude: -99
            },
            zoom: 5
        };

        $scope.csvData = '';

        $scope.locations = [];

        $scope.reOrganizeDataByLocation = function(data) {

            for (var i = 0; i < data.length; i++) {
              var locationArray = data[i].geolocation.split(",");
            
              var latitude = parseFloat( locationArray[0].substring(1, locationArray[0].length) );
              var longitude = parseFloat( locationArray[1].substring(0, locationArray[1].length-1) );

              var location = { 'title': 'test', 'latitude': latitude, 'longitude': longitude };

              $scope.locations.push(location);
            };
        };


        $scope.init = function() {
            $.get('csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                $scope.reOrganizeDataByLocation($scope.csvData);
            }, 'text');
        };

    }]
);