'use strict';
(function () {
    angular.module('SampleApp.mainPage', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/logIn', {
                templateUrl: 'templates/logIn.html',
                controller: 'mainPageCtrl'
            });
        }]);
})();