'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
    'app.controllers',
    'app.filters',
    'app.services',
    'app.directives',
    'ui.bootstrap.tabs'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', { templateUrl: 'partials/home.html', controller: 'HomeCtrl' });
        $routeProvider.when('/service', { templateUrl: 'partials/service.html', controller: 'CodeDemoCtrl' });
        $routeProvider.when('/filter', { templateUrl: 'partials/filter.html', controller: 'CodeDemoCtrl' });
        $routeProvider.when('/controller', { templateUrl: 'partials/controller.html', controller: 'CodeDemoCtrl' });
        $routeProvider.when('/model', { templateUrl: 'partials/model.html', controller: 'CodeDemoCtrl' });
        $routeProvider.when('/directive', { templateUrl: 'partials/directive.html', controller: 'CodeDemoCtrl' });
        $routeProvider.otherwise({ redirectTo: '/' });
    }]);