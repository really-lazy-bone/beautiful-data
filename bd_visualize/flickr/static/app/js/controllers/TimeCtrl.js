angular.module('lazyApp').controller('TimeCtrl',
    ['$scope', '$location', 'Resources', 'Util',
    function($scope, $location, Resources, Util) {

        $scope.csvData = '';

        $scope.reOrganizeDataByTime = function(data) {
            // Organize the data by the locale
            var timeData = [];

            $scope.idTracks = [];

            // Parsing and counting the time
            for (var i = 0; i < data.length; i++) {

              if ($scope.idTracks.indexOf(data[i].photo_id) > -1) {
                 continue;
              } else {
                $scope.idTracks.push(data[i].photo_id);

                var postedDate = new Date(data[i].date_taken);

                var index = -1;

                for (var j = 0; j < timeData.length; j ++) {
                  if ( ( timeData[j][0].getTime() - postedDate.getTime() ) * 
                       ( timeData[j][0].getTime() - postedDate.getTime() ) < 1000*60*60*24*1000*60*60*24) {
                    index = j;
                    break;
                  }
                };

                // if the locale caregory does not contain the current item
                if (index == -1) {
                    timeData.push([postedDate, 1]);
                } else {
                    var temp = timeData[index];
                    temp[1] ++;
                    timeData[index] = temp;
                };
              }
            };

            // sort date
            for (var i = 0; i < timeData.length; i ++) {
              var min = i;

              for (var j = i + 1; j < timeData.length; j ++) {
                if (timeData[j][0] < timeData[min][0]) {
                  min = j;
                }
              }

              if (min != i) {
                var temp = timeData[i];
                timeData[i] = timeData[min];
                timeData[min] = temp;
              }
            };

            // Create a timer
            var start = + new Date();

            var chart = new Highcharts.Chart({
              chart: {
                renderTo: 'container',
                events: {
                  load: function(chart) {
                    this.setTitle(null, {
                      text: 'Built chart at '+ (new Date() - start) +'ms'
                    });
                  }
                },
                type: 'spline',
                zoomType: 'x'
              },
              rangeSelector: {
                  selected: 1
              },
              xAxis: {
                type: 'datetime',
                maxZoom: 1 * 3600 * 100
              },
              title: {
                  text: 'Flickr Time Statistic'
              },
              subtitle: {
                  text: 'Basic count'
              },
              series: [{
                name: 'Count',
                data: timeData,
                pointInterval: 24 * 3600 * 1000,
                pointStart: Date.UTC(2013,00,01),
              }]
            });

        };


        $scope.init = function() {
            $.get('/app/csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                $scope.reOrganizeDataByTime($scope.csvData);
            }, 'text');
        };

    }]
);