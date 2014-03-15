angular.module('lazyApp').controller('LocationCtrl',
    ['$scope', '$location', 'Resources', 'months',
    function($scope, $location, Resources, months) {

      $scope.months = months;

      $scope.setMonth = function(m) {
        Resources.getPhotoMonthly(
            { operation: $scope.month },
            function(data) {
              $scope.monthlyData = data.items;
              $scope.reOrganizeDataByLocale($scope.monthlyData);
            },
            function(err){
              console.log(err);
          });
        $scope.month = m;
        $('.ui.dropdown')
          .dropdown('hide', function() {
            console.log('toggle dropdwon to be closed');
          })
        ;
      };

      $scope.reOrganizeDataByLocale = function(data) {
          // Organize the data by the locale
          var locales = [];

          function indexOfObj(array, obj, property) {
            for (var i = 0; i < array.length; i ++) {
              if (array[i][property] == obj) return i;
            }
            return -1;
          };

          // basic counting
          for (var i = 0; i < data.length; i++) {
            var locationArray = (data[i].locale != undefined) ? data[i].locale : ['!undefined'];

            var location = locationArray[0];

            // if the locale caregory does not contain the current item
            var index = indexOfObj(locales, location, 0);
            if (index == -1) {
              var locale = [location, 1];
              locales.push(locale);
            } else {
              locales[index][1] ++;
            };
          };

          function Comparator(a,b){
              if (a[1] > b[1]) return -1;
              if (a[1] < b[1]) return 1;
              return 0;
          };

          locales = locales.sort(Comparator);

          console.log(locales);

          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container',
              type: 'pie'
            },
            plotOptions: {
                column: {
                    pointPadding: 0.075,
                    borderWidth: 1,
                    groupPadding: 0,
                    showCheckBox: true,
                    shadow: true
                }
            },
            xAxis: {
              min: 0,
              max: 15,
              type: 'category'
            },
            title: '',
            series: [{
              data: locales
            }]
          });
      };

      $scope.init = function() {
          $scope.month = 'january';
          Resources.getPhotoMonthly(
            { operation: $scope.month },
            function(data) {
              $scope.monthlyData = data.items;
              $scope.reOrganizeDataByLocale($scope.monthlyData);
              $('.ui.dropdown')
                .dropdown('hide', function() {
                  console.log('toggle dropdwon to be closed');
                })
              ;
            },
            function(err){
              console.log(err);
          });

      };

    }]
);