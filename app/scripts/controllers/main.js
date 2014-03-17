'use strict';

angular.module('graphCmsApp')
    .controller('MainCtrl', ['$scope','entryService', function ($scope,entryService) {


        var data = {
            title: '',
            description: '',
            relations : []
        };

        $scope.data = data;

        /**
         * Speichert einen Eintrag
         */
        $scope.save = function () {

            // Relations extrahieren und zusammenstellen
            for ( var i = 0; i < $scope.searchResult.length; i++) {
                if ($scope.searchResult[i].relations) {
                    $scope.data.relations.push($scope.searchResult[i]._id);
                }
            }

            // Ruft den Service
            entryService.saveEntry($scope.data)
                .success(function(answer) {
                    console.log(answer.message);
                    _resetData();
                    $scope.searchResult = [];
                })
                .error(function(err) {
                    console.log(err);
                });
          };

        var _resetData = function() {
            $scope.data.title = '';
            $scope.data.description = '';
            $scope.data.relations = [];
        }

        /**
         * Suchfunktion: holt Nodes, in denen die Wörter aus Titel und
         * Beschreibung vorkommen
         */
        $scope.search = function() {
            entryService.search(_getTitleWords())
                .success(function(answer) {
                    $scope.searchResult = answer.result;
                })
                .error(function(err) {
                    console.log(err);
                });
        };

        /**
         * Hilfsfunktion: Erstellt Strings in Form von regulären Ausdrücken,
         * die in den Cypher-String eingebaut werden können.
         * @returns {{titleTerms: (*|Array), descTerms: (*|Array)}}
         * @private
         */
        var _getTitleWords = function() {

            console.log($scope.data);

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

        /**
         * Holt alle Nodes
         */
        $scope.getAll = function() {
            entryService.getAll()
                .success(function(result) {
                    $scope.all = result;
                })
                .error(function(err) {
                    console.log(err);
                });
        }

        /**
         * @deprecated
         * @param id
         */
        $scope.refreshRelationList = function(id) {
            console.log($scope.entryform.relSelection[0].$viewValue);
        }

      }]);
