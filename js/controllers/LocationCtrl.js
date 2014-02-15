angular.module('lazyApp').controller('LocationCtrl',
    ['$scope', '$location', 'Resources', 'Util',
    function($scope, $location, Resources, Util) {

        $scope.csvData = '';

        $scope.reOrganizeDataByLocale = function(data) {
            // Organize the data by the locale
            var localeCategory = [];
            var localeCount = [];

            for (var i = 0; i < data.length; i++) {
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
            $.get('csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                $scope.reOrganizeDataByLocale($scope.csvData);
            }, 'text');
        };

    }]
);