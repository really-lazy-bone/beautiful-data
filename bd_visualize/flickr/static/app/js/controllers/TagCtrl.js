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
            var tagData = [];

            function indexOfObj(array, obj, property) {
              for (var i = 0; i < array.length; i ++) {
                if (array[i][property] == obj) return i;
              }
              return -1;
            };

            // Parsing and counting the tag
            for (var i = 0; i < data.length; i++) {
              var tagsArray = (data[i].tags != undefined) ? data[i].tags : [];

              // count each word individually
              for (var j = 0; j < tagsArray.length; j ++) {
                var tag = tagsArray[j];

                var index = indexOfObj(tagData, tag, 0);

                if (index == -1) {
                    var tagD = [tag, 1];
                    tagData.push(tagD);
                } else {
                    tagData[index][1] ++;
                };
              };
            };

            var i = 0;
            while (i < tagData.length) {
              if (tagData[i][1] < 10) {
                tagData.splice(i, 1);
              }
              i ++;
            }

            function Comparator(a,b){
                if (a[1] > b[1]) return -1;
                if (a[1] < b[1]) return 1;
                return 0;
            };

            tagData = tagData.sort(Comparator);

            tagData.splice(999);

            console.log(tagData);

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
                type: 'category'
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
                data: tagData
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