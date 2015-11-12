
app.controller("SampleAppCtrl", ['$http', '$scope', '$location', '$localstorage', function ($http, $scope, $location, $localstorage) {

	$http({method: 'GET', url: '/allData'}).success(function(data){
		
		$scope.items = data,
		       templatePath = 'templates/main.html',
		       sortField = undefined,
		       reverse = false;
		
		//ASC DESC sort
		$scope.sort = function (fildName) {
			if($scope.sortField === fildName) {
				$scope.reverse = !$scope.reverse;
			} else {
				$scope.sortField = fildName
				$scope.reverse = false;
			}
		};
		
		
		$scope.isSortUp = function (fildName) {
			return $scope.sortField === fildName && !$scope.reverse;
		};
		
		$scope.isSortDown = function (fildName) {
			return $scope.sortField === fildName && $scope.reverse;
		};
        
		$scope.formaHide = true;
		$scope.formaHideAdd = false;
		
        $scope.SingIn = function () {
			$scope.formaHide = false;
			$scope.formaHideAdd = false;
	    }
		$scope.LogIn = function () {
			$scope.formaHide = false;
			$scope.formaHideAdd = true;
	    }
		$scope.user = {
                login: undefined,
                password: undefined,
				chekPassword: undefined
            };

		function emptyLable() {
			for(var item in $scope.user){
				if($scope.user[item] == undefined){
					$('.' + item + 'Err').text('Field empty').css({'display': 'block', 'color': 'red'});
					
				} else {
					$('.' + item + 'Err').text('Field empty').css('display', 'none');
				}
			}
		}	

		$scope.userName = $localstorage.get('user', 'User');

        $scope.postLogin = function () {
            emptyLable();
						
			$http.post('/logIn', $scope.user).then(function successCallback(response) {

				if (response.data.success) {
					$scope.userName = $scope.user.login;
					$scope.formaHide = true;
					$location.path( "/logIn" );					
					$localstorage.set('token', response.data.token);
					$localstorage.set('user', $scope.user.login);
                    $('.chekPasswordErr').css('display', 'none');					
				} else {
					$('.chekPasswordErr').text('wrong password or login').css({'display': 'block', 'color': 'red'});
				}
			}, function errorCallback(err) {
				console.log('error: ' + err);
			});
        };
		
		$scope.postSingUp = function() {
			if(checkPass($scope.user)){
				$http.post('/singIn', $scope.user).then(function successCallback(response) {
					if (response.data.success) {
						$scope.userName = $scope.user.login;
						$scope.formaHide = true;
						$location.path( "/logIn" );					
						$localstorage.set('token', response.data.token);
						$localstorage.set('user', $scope.user.login);						
					}
			    }, function errorCallback(err) {
				    console.log('error: ' + err);
			    });
			}
		}
        
		function checkPass(item) {
			emptyLable();
			
			var answer = true;
			if(item.password === undefined || item.login === undefined || item.password !== item.chekPassword) {
				$('.chekPasswordErr').text('password does not match').css('display', 'block');
				answer = false;
			}
			return answer;
		}
		
		$scope.LogOut = function() {
			$scope.userName = 'User';
			$localstorage.dell('token');
			$localstorage.dell('user');
			$location.path( "/" );	
		}

		$scope.Main = function() {
			$location.path( "/logIn" );	
		}
    });
}]);