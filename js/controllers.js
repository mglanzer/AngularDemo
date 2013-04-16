'use strict';

/* Controllers */

(function() {
    angular.module('app.controllers', [])
        .controller('HomeCtrl', ['$scope', '$timeout', 'NetMon', function(scope, timeout, netmon) {

            scope.servers = netmon.getServers();
            var statusOnline = 'online',
                statusOffline = 'offline',
                statusTransitioning = 'transitioning';

            scope.statusLabel = function(server) {
                switch (server.status) {
                case statusOnline:
                    return 'label label-success';
                case statusOffline:
                    return 'label';
                case statusTransitioning:
                    return 'label label-warning';
                }
            };
            scope.toggleStatusLabel = function(server) {
                return server.status === statusOnline ? 'Take Offline' : 'Put Online';
            };
            scope.toggleOffline = function(server) {
                var prevStatus = server.status;
                server.status = statusTransitioning;
                timeout(function() {
                    server.status = (prevStatus === statusOnline ? statusOffline : statusOnline);
                }, 1500);
            };
            scope.onlineServerCount = function() {
                return _.filter(scope.servers, function(s) {
                    return s.status === statusOnline;
                }).length;
            };
        }])
        .controller('CodeDemoCtrl', ['$scope', '$routeParams', function ($scope, $params) {
            
        }])
        .controller('OLD_CodeDemoCtrl', ['$scope', '$routeParams', '$q', '$http', 'CodeDemos', function($scope, $params, $q, $http, demos) {
            var demoId = $params.demoId,
                demo = demos.getDemo(demoId),
                demoToTabs = function(d) {
                    var deferred = $q.defer(),
                        jsContent,
                        htmlContent,
                        panes = [{
                            title: 'Description',
                            content: demo.desc
                        }];

                    $http.get(demo.jsUrl).success(function(js) {
                        jsContent = js;
                        panes.push({
                            title: "JS",
                            content: jsContent
                        });

                        $http.get(demo.htmlUrl).success(function(html) {
                            htmlContent = html;
                            panes.push({
                                title: "HTML",
                                content: htmlContent
                            });

                            deferred.resolve(panes);
                        });
                    });

                    return deferred.promise;
                };

            $scope.demo = demo;
            $scope.panes = demoToTabs(demo);
        }]);
}());