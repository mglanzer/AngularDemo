'use strict';

/* Services */

angular.module('app.services', [])
    .factory('NetMon', ['$timeout', function(timeout) {

        var getLatency = function(max) {
            return Math.random() * 100 % (max ? max : 50);
        },
            servers = _.map(_.range(10), function(i) {
                return { name: "Server " + i, latency: getLatency(), status: 'online' };
            }),
            updateLatency = function() {
                return _.each(servers, function(s) {
                    s.latency = s.status === 'online' ? getLatency() : 0;
                });
            };

        var updateIntervalMs = 3000,
            startMonitoring = function() {
                updateLatency(servers);

                // $timeout uses $apply internally, can pass false to avoid
                timeout(startMonitoring, updateIntervalMs);
            };

        startMonitoring();

        return {
            getServers: function() {
                return servers;
            }
        };

    }])
    .factory('Cache', [function() {
        var cache = {};

        return {
            get: function(key) {
                if (key in cache) {
                    return cache[key];
                }
                return undefined;
            },
            put: function(key, value) {
                cache[key] = value;
            }
        };
    }])
    .factory('SyntaxHighlight', function() {
        if (!hljs) {
            throw 'Expected highlight.js to be loaded';
        }

        return {
            highlight: function(elm) {
                _.each(elm, hljs.highlightBlock);
            }
        };
    });