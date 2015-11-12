'use strict';
(function () {
    angular.module('SampleApp.itemPage')
        .controller('itemPageCtrl', ['$scope', '$location', '$http', '$localstorage', '$routeParams', function($scope, $location, $http, $localstorage, $routeParams) {
			$scope.user = {'token': $localstorage.get('token', 0)};
			
			$http.post('/check', $scope.user).then(function successCallback(response) {
				if(!response.data) {
					 $location.path( "/" );
			    } else {
			    	$http.get('/reviews/'+ $routeParams.id).then(function successCallback(response) {
		                $scope.reviews = response.data;
		                var num = 0;

		                $scope.reviews.forEach(function(item) {
		                 	num += +item.rate;
		                })

		                num = num / $scope.reviews.length;

		                $scope.rate = num.toFixed(2);
		              
					}, function errorCallback(err) {
						console.log('error: ' + err);
					});
			    }

			}, function errorCallback(err) {
				console.log('error: ' + err);
			});


			$scope.items.forEach(function(item) {
				if(item.id == $routeParams.id) {
					$scope.fullItem = item;
				}
			})

			$scope.goods = {
				rate: '',
				text: '',
				token: $scope.user.token
			};

			$scope.addComent = function() {
				if(!$scope.goods.rate) {
					$('.makeRate').text('Please vote').css({'display': 'block', 'color': 'red'});
				} else {
					$('.makeRate').css({'display': 'none'});
					$scope.reviews.push($scope.goods);
				
				    $http.post('/reviews/' + $routeParams.id, $scope.goods).then(function successCallback(response) {
		                var response = response.data;
					}, function errorCallback(err) {
						console.log('error: ' + err);
					});
				    $scope.goods = {};
			    }
			}
        }]);
})();