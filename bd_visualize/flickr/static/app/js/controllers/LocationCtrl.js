angular.module('lazyApp').controller('LocationCtrl',
    ['$scope', '$location', 'Resources', 'months',
    function($scope, $location, Resources, months) {

      $scope.months = months;

      $scope.setMonth = function(m) {
        Resources.getPhotoStatistic(
            {
              model: $scope.month,
              field: 'locale',
              operation: 'statistic'
            },
            function(data) {
              $scope.locationData = data.items;
              $scope.reOrganizeDataByLocale($scope.locationData);
              $('.ui.dropdown')
                .dropdown('hide', function() {
                  console.log('toggle dropdwon to be closed');
                })
              ;
            },
            function(err){
              console.log(err);
          });;
        $scope.month = m;
        $('.ui.dropdown')
          .dropdown('hide', function() {
          })
        ;
      };

      $scope.reOrganizeDataByLocale = function(data) {
          // Organize the data by the locale

          console.log(data);

          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'container',
              type: 'pie'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            xAxis: {
              min: 0,
              max: 15,
              type: 'category'
            },
            title: '',
            series: [{
              name: $scope.month + '\'s photos',
              data: data
            }]
          });
      };

      $scope.init = function() {
          $scope.month = 'january';
          Resources.getPhotoStatistic(
            {
              model: $scope.month,
              field: 'locale',
              operation: 'statistic'
            },
            function(data) {
              $scope.locationData = data.items;
              $scope.reOrganizeDataByLocale($scope.locationData);
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