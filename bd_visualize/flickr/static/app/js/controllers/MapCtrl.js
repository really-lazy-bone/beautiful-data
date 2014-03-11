angular.module('lazyApp').controller('MapCtrl',
    ['$scope', '$location', 'Resources', 'months',
    function($scope, $location, Resources, months) {
        // Put the map center at the center of United States
        $scope.map = {
            center: {
                latitude: 40,
                longitude: -99
            },
            zoom: 5
        };

        $scope.months = months;

        $scope.setMonth = function(m) {
            $scope.month = m;
            $('.ui.dropdown')
              .dropdown('hide', function() {
                console.log('toggle dropdwon to be closed');
              })
            ;
            Resources.getPhotoMonthly(
                { operation: $scope.month },
                function(data) {
                  $scope.monthlyData = data.items;
                  $scope.reOrganizeDataByLocation($scope.monthlyData);
                },
                function(err){
                  console.log(err);
              });
        }


        $scope.reOrganizeDataByLocation = function(data) {
            $scope.locations = [];

          for (var i = 0; i < data.length; i++) {
            var locationArray = data[i].geolocation;

            var latitude = parseFloat( locationArray[0] );
            var longitude = parseFloat( locationArray[1] );
            var imageLink = data[i].url.indexOf("jpg") > -1 ? data[i].url : "";

            var location = {
              'title': 'test',
              'latitude': latitude,
              'longitude': longitude,
              'url': "" + data[i].url,
              'image': imageLink
            };

            $scope.locations.push(location);
          }

        };


        $scope.init = function() {
            $('.ui.dropdown')
             .dropdown()
            ;

            $scope.month = 'january';

            Resources.getPhotoMonthly(
                { operation: $scope.month },
                function(data) {
                  $scope.monthlyData = data.items;
                  $scope.reOrganizeDataByLocation($scope.monthlyData);
                },
                function(err){
                  console.log(err);
              });
        };

    }]
);