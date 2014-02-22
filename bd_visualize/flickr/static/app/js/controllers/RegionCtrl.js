angular.module('lazyApp').controller('RegionCtrl',
    ['$scope', '$location', 'Resources', 'Util',
    function($scope, $location, Resources, Util) {

        $scope.csvData = '';

        $scope.idTracks = [];

        $scope.reOrganizeDataByLocale = function(data) {
            // Organize the data by the locale
            var localeCategory = [];
            var localeCount = [];

            for (var i = 0; i < data.length; i++) {
              if ($scope.idTracks.indexOf(data[i].photo_id) > -1) {
                 continue;
              } else {
                $scope.idTracks.push(data[i].photo_id);

                var locationArray = data[i].locale.split(",");
              
                var location = Util.convertFlickrText(locationArray[0]);

                // if the locale caregory does not contain the current item
                var index = localeCategory.indexOf(location);
                if (index == -1) {
                  localeCategory.push(location);
                  localeCount.push(parseInt(1));
                } else {
                  localeCount[index] ++;
                };
              }
            };

            // sort date by selection sort
            for (var i = 0; i < localeCategory.length; i ++) {
              var min = i;

              for (var j = i + 1; j < localeCategory.length; j ++) {
                if (localeCategory[j] < localeCategory[min]) {
                  min = j;
                }
              }

              if (min != i) {
                var temp = localeCategory[i];
                localeCategory[i] = localeCategory[min];
                localeCategory[min] = temp;
                var tempCount = localeCount[i];
                localeCount[i] = localeCount[min];
                localeCount[min] = tempCount;
              }
            };

            var chart = new Highcharts.Chart({
              chart: {
                renderTo: 'container',
                type: 'bar'
              },
              xAxis: {
                min: 0,
                max: 10,
                categories: localeCategory
              },
              title: {
                  text: 'Flickr Location Statistic'
              },
              subtitle: {
                  text: 'Basic count'
              },
              scrollbar: {
                enabled: true
              },
              series: [{
                data: localeCount
              }]
            });

        };


        $scope.init = function() {
            $.get('/app/csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                $scope.reOrganizeDataByLocale($scope.csvData);
            }, 'text');
        };

    }]
);