angular.module('lazyApp').controller('LocationCtrl',
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
              $scope.reOrganizeDataByLocale($scope.monthlyData);
            },
            function(err){
              console.log(err);
          });
      }

      $scope.reOrganizeDataByLocale = function(data) {
          // Organize the data by the locale
          var localeCategory = [];
          var localeCount = [];

          // basic counting
          for (var i = 0; i < data.length; i++) {
            var locationArray = (data[i].locale != undefined) ? data[i].locale : ['!undefined'];

            var location = locationArray[0];

            // if the locale caregory does not contain the current item
            var index = localeCategory.indexOf(location);
            if (index == -1) {
              localeCategory.push(location);
              localeCount.push(parseInt(1));
            } else {
              localeCount[index] ++;
            };
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
                text: 'Basic Count'
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
          $('.ui.dropdown')
            .dropdown()
          ;

          $scope.month = 'january';

          Resources.getPhotoMonthly(
            { operation: $scope.month },
            function(data) {
              $scope.monthlyData = data.items;
              $scope.reOrganizeDataByLocale($scope.monthlyData);
            },
            function(err){
              console.log(err);
          });
      };

    }]
);