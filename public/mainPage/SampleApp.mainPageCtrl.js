'use strict';
(function () {
    angular.module('SampleApp.mainPage')
        .controller('mainPageCtrl', ['$scope', '$location', '$http', '$localstorage', function($scope, $location, $http, $localstorage) {
			$scope.user = {'token': $localstorage.get('token', 0)};
			
			$http.post('/check', $scope.user).then(function successCallback(response) {
				if(!response.data){
					 $location.path( "/" );
				}
			}, function errorCallback(err) {
				console.log('error: ' + err);
			});
        }]);
})();