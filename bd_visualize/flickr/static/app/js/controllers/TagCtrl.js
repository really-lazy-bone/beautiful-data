angular.module('lazyApp').controller('TagCtrl',
    ['$scope', '$location', 'Resources', 'Util',
    function($scope, $location, Resources, Util) {

        $scope.csvData = '';

        $scope.reOrganizeDataByTag = function(data) {
            // Organize the data by the locale
            var tagCategory = [];
            var tagCount = [];

            $scope.idTracks = [];

            // Parsing and counting the tag
            for (var i = 0; i < data.length; i++) {

              if ($scope.idTracks.indexOf(data[i].photo_id) > -1) {
                 continue;
              } else {
                  $scope.idTracks.push(data[i].photo_id);
                  var tagsArray = data[i].tags.split(",");
                  
                  // count each word individually
                  for (var j = 0; j < tagsArray.length; j ++) {
                    var tag = Util.convertFlickrText(tagsArray[j]);

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

            // sort date by selection sort
            for (var i = 0; i < tagCategory.length; i ++) {
              var min = i;

              for (var j = i + 1; j < tagCategory.length; j ++) {
                if (tagCategory[j] < tagCategory[min]) {
                  min = j;
                }
              }

              if (min != i) {
                var temp = tagCategory[i];
                tagCategory[i] = tagCategory[min];
                tagCategory[min] = temp;
                var tempCount = tagCount[i];
                tagCount[i] = tagCount[min];
                tagCategory[min] = tempCount;
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
            $.get('/map/csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                $scope.reOrganizeDataByTag($scope.csvData);
            }, 'text');
        };

    }]
);