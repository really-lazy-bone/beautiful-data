angular.module('lazyApp').controller('TagCtrl',
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
                $scope.reOrganizeDataByTag($scope.monthlyData);
              },
              function(err){
                console.log(err);
            });
        };

        $scope.reOrganizeDataByTag = function(data) {
            // Organize the data by the locale
            var tagCategory = [];
            var tagCount = [];

            // Parsing and counting the tag
            for (var i = 0; i < data.length; i++) {
              var tagsArray = (data[i].tags != undefined) ? data[i].tags : [];

              // count each word individually
              for (var j = 0; j < tagsArray.length; j ++) {
                var tag = tagsArray[j];

                var index = tagCategory.indexOf(tag);

                // if the locale caregory does not contain the current item
                if (index == -1) {
                    tagCategory.push(tag);
                    tagCount.push(parseInt(1));
                } else {
                    tagCount[index] ++;
                };
              };
            };

            // remove the tags that shows up less than 10 times
            var i = 0;
            while (i < tagCategory.length) {
              if (tagCount[i] < 10) {
                tagCount.splice(i, 1);
                tagCategory.splice(i, 1);
              } else {
                i ++;
              };
            };

            var chart = new Highcharts.Chart({
              chart: {
                renderTo: 'container',
                type: 'column'
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
                categories: tagCategory
              },
              title: {
                  text: 'Flickr Tag Statistic'
              },
              subtitle: {
                  text: 'Basic count'
              },
              scrollbar: {
                enabled: true
              },
              series: [{
                data: tagCount
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
                $scope.reOrganizeDataByTag($scope.monthlyData);
              },
              function(err){
                console.log(err);
            });
        };

    }]
);