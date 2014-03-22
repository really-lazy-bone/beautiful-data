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

              var postedDate = new Date(data[i].date_taken.split(" ")[0]);

              var index = -1;

              for (var j = 0; j < timeData.length; j ++) {
                if ( timeData[j][0].getYear() === postedDate.getYear() &&
                    timeData[j][0].getMonth() === postedDate.getMonth() &&
                    timeData[j][0].getDate() === postedDate.getDate() ) {
                  index = j;
                  break;
                }
              };

              // if the locale caregory does not contain the current item
              if (index == -1) {
                  timeData.push([postedDate, 1]);
              } else {
                  timeData[index][1]++;
              };
            };

            function Comparator(a,b){
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                return 0;
            };

            timeData = timeData.sort(Comparator);

            for (var i = 0; i < timeData.length; i++) {
              timeData[i][0] = timeData[i][0].getTime();
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
              xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%b %e.',
                    year: '%b'
                }
              },
              tooltip: {
                  formatter: function() {
                          return '<b>'+ this.series.name +'</b><br/>'+
                          Highcharts.dateFormat('%b %e.', this.x) +': '+ this.y +' photos.';
                  }
              },
              title: {
                  text: ''
              },
              series: [{
                name: $scope.month,
                data: timeData
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