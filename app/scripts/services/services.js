'use strict';

angular.module('graphCmsApp.services', [])
  .factory('entryService', ['$http', function($http) {
        var api_url = "/api";

        var runSaveRequest = function(entry) {
            // Return the promise from the $http service
            // that calls the Github API using JSONP
            return $http({
                method: 'POST',
                url: api_url + '/save',
                data: { title: entry }
            }).success(function(answer) {
                return answer;
                console.log('Success');
            }).error(function(err) {
                return 'Fehler!';
            });
        };

        return {
            saveEntry: function(entry) {
                return runSaveRequest(entry);
            }
        };
}]);