'use strict';
(function () {
    angular.module('SampleApp.itemPage', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/logIn/:id', {
                templateUrl: 'templates/item.html',
                controller: 'mainPageCtrl'
            });
        }]);
})();