'use strict';

/* Filters */

angular.module('app.filters', [])
    .filter('min', [function() {
        return function (objects, property, min) {
            min = parseInt(min);
            
            var filtered = _.filter(objects, function(o) {
                return o[property] >= min;
            });

            return filtered;
        };
    }]);