angular.module('lazyApp').controller('TagCtrl',
    ['$scope', '$location', 'Resources',
    function($scope, $location, Resources) {

        $scope.csvData = '';

        $scope.reOrganizeDataByTag = function(data) {
            // Organize the data by the locale
            var tagCategory = [];
            var tagCount = [];

            // Parsing and counting the tag
            for (var i = 0; i < data.length; i++) {
              var tagsArray = data[i].tags.split(",");
              
              // count each word individually
              for (var j = 0; j < tagsArray.length; j ++) {
                var tag = tagsArray[j].replace(/[\[\]\'&]+/g, '').trim();
                tag = tag.substring(1, tag.length).toLowerCase();

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
            $.get('csv/january_flickrdump.csv', function(data) {
                $scope.csvData = $.csv.toObjects(data);

                $scope.reOrganizeDataByTag($scope.csvData);
            }, 'text');
        };

    }]
);