'use strict';

angular.module('graphCmsApp')
    .controller('MainCtrl', ['$scope','entryService', function ($scope, entryService) {

        $scope.save = function () {
            console.log($scope.title, $scope.description);

            // {   "query" : "CREATE (e:Entry {date: "2014-03-13", title: "{title}", description: "{description}"})",   "params" : { "title": "' + $scope.title + '", "description": "' + $scope.description + '" } }
            entryService.saveEntry($scope.title)
                .success(function(data) {
                    console.log('Alles gut: ' +  data.message);
                })
                .error(function(err) {
                    console.log(err);
                });
          };
      }]);
