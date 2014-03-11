angular.module('lazyApp').controller('TimeCtrl',
    ['$scope', '$location', 'Resources', 'months',
    function($scope, $location, Resources, months) {

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
                $scope.reOrganizeDataByTime($scope.monthlyData);
              },
              function(err){
                console.log(err);
            });
        };

        $scope.reOrganizeDataByTime = function(data) {
            // Organize the data by the locale
            var timeData = [];

            // Parsing and counting the time
            for (var i = 0; i < data.length; i++) {

              var postedDate = new Date(data[i].date_taken);

              var index = -1;

              for (var j = 0; j < timeData.length; j ++) {
                if ( ( timeData[j][0].getTime() - postedDate.getTime() ) *
                     ( timeData[j][0].getTime() - postedDate.getTime() ) <
                      1000*60*60*24*1000*60*60*24) {
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
                pointStart: Date.UTC(2013,11,01),
              }]
            });

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
              $scope.reOrganizeDataByTime($scope.monthlyData);
            },
            function(err){
              console.log(err);
          });
        };

    }]
);