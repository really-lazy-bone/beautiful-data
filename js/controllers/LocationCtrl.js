angular.module('lazyApp').controller('LocationCtrl',
    ['$scope', '$location', 'Resources',
    function($scope, $location, Resources) {

        $scope.csvData = '';

        $scope.reOrganizeDataByLocale = function(data) {
            // Organize the data by the locale
            var localeCategory = [];
            var localeCount = [];

            for (var i = 0; i < data.length; i++) {
              var locationArray = data[i].locale.split(",");
              
              var location = locationArray[0].substring(3, locationArray[0].length - 1)

              // if the locale caregory does not contain the current item
              if (localeCategory.indexOf(location) == -1) {
                localeCategory.push(location);
                localeCount.push(parseInt(1));
              } else {
                localeCount[localeCategory.indexOf(location)] ++;
              };
            };

            var chart = new Highcharts.Chart({
              chart: {
                renderTo: 'container',
                type: 'bar'
              },
              xAxis: {
                min: 0,
                max: 20,
                categories: localeCategory
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
            $.get('csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                console.log($scope.csvData);

                $scope.reOrganizeDataByLocale($scope.csvData);
            }, 'text');
        };

    }]
);