var app = angular.module("SampleApp", ['ngRoute', 'SampleApp.mainPage', 'SampleApp.itemPage']);

app.config(function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/main.html'
    })
	
	.otherwise({
        redirectTo: '/'
      });
		
});

app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
	
	dell: function(key) {
		$window.localStorage.removeItem(key);
	}
  }
}]);

