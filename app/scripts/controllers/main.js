'use strict';

angular.module('graphCmsApp')
    .controller('MainCtrl', ['$scope','entryService', function ($scope, entryService) {

        $scope.title        = '';
        $scope.description  = '';

        $scope.data = {
            title: $scope.title,
            description: $scope.description
        };

        $scope.save = function () {

            console.log($scope.data);

            entryService.saveEntry($scope.data)
                .success(function(data) {
                    console.log(data.message);
                    $scope.data = {};
                    $scope.searchResult = [];
                })
                .error(function(err) {
                    console.log(err);
                });
          };

        $scope.getAll = function() {
            entryService.getAll()
                .success(function(data) {
                    $scope.all = data;
                })
                .error(function(err) {
                    console.log(err);
                });
        }

        $scope.search = function() {
            entryService.search(_getTitleWords())
                .success(function(data) {
                    $scope.searchResult = data.result;
                })
                .error(function(err) {
                    console.log(err);
                });
        };

        var _getTitleWords = function() {

            // Die Wörter des title
            var titleTerms = $scope.data.title.split(' ');

            // Die Wörter der description
            var descTerms = $scope.data.description.split(' ');

            titleTerms = titleTerms.join('.*)|(.*');
            titleTerms= '"(.*' + titleTerms + '.*)"';

            descTerms = descTerms.join('.*)|(.*');
            descTerms= '"(.*' + descTerms + '.*)"';

            console.log(titleTerms);
            console.log(descTerms);

            return {
                titleTerms: titleTerms,
                descTerms:  descTerms
            }
        };
      }]);
