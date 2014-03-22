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

            WordCloud(
              document.getElementById('tagcloud'),
              {
                list: tagData,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                hover: function drawBox(item, dimension) {
                  console.log(item)
                },
              }
            );

        };


        $scope.init = function() {
            $('.ui.dropdown')
              .dropdown()
            ;

            $scope.month = 'january';

            var canvas = document.getElementById('tagcloud')

            // Set the width and height
            var width = document.getElementById('container').offsetWidth;
            var height = document.getElementById('container').offsetHeight;
            var pixelWidth = width;
            var pixelHeight = height;

            canvas.width = pixelWidth;
            canvas.height = pixelHeight;

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