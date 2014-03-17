'use strict';

angular.module('graphCmsApp.services', [])
  .factory('entryService', ['$http', function($http) {
        var api_url = "/api";

        var runSaveRequest = function(entry) {
            // Return the promise from the $http service
            // that calls the Github API using JSONP
            return $http({
                method: 'POST',
                url: api_url + '/node/save',
                data: entry
            }).success(function(answer) {
                return answer;
                console.log('Success');
            }).error(function(err) {
                return 'Fehler!';
            });
        };

        var runGetAllRequest = function() {
            return $http({
                method: 'GET',
                url: api_url + '/node/all'
            }).success(function(answer){
                return answer;
            }).error(function(err) {
                console.log(err);
            });
        }

        var runSearchRequest = function(searchString) {
            return $http({
                method: 'POST',
                url: api_url + '/node/search',
                data: searchString
            }).success(function(answer){
                return answer;
            }).error(function(err) {
                console.log(err);
            });
        }

        return {
            saveEntry: function(entry) {
                return runSaveRequest(entry);
            },
            getAll: function() {
                return runGetAllRequest();
            },
            search: function(searchString) {
                return runSearchRequest(searchString);
            }
        };
}]);