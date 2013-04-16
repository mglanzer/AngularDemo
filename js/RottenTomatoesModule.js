'use strict';

angular.module('RottenTomatoesAPI', [])
    .factory('RottenTomatoes', ['$resource', function (res) {
        var s = {
            getMovies: function() {
                return {
                      
                };
            }    
        };

        return s;
    }]);