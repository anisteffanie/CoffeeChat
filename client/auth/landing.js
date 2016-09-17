angular.module('Coffeechat.landing', [])
.controller('landingCtrl', function($scope, $state, authFactory){
	console.log('landing page')
	$scope.signNav = true;

    //user signup
	$scope.signupBox = false;
	$scope.showSignupBox = function(){
		$scope.signupBox = true;
		$scope.signNav = false;
	};
 	$scope.hideSignupBox = function(){
		$scope.signupBox = false;
		$scope.signNav = true;
 	};
 	$scope.userSignup = function(){
 		var newUser = {
 			firstName: $scope.firstName,
 			lastName: $scope.lastName,
 			username: $scope.signupUsername,
 			password: $scope.signupPassword,
 			favoriteCoffee: $scope.favCoffee
 		};
 		authFactory.userSignup(newUser)
 		.then(function(data){
 			console.log(data.data)
 		});
 		$scope.hideSignupBox();
 	};


 	//user signin
 	$scope.showSigninBox = function(){
 		$scope.signinBox = true;
 		$scope.signNav = false;
 	}
 	$scope.hideSigninBox = function(){
		$scope.signinBox = false;
		$scope.signNav = true;
 	};
 	$scope.userSignin = function(){
 		var user = {
 			username: $scope.signinUsername,
 			password: $scope.signinPassword	
		};
		authFactory.userSignin(user).then(function(data){
			console.log(data.data);
		})
 	$scope.hideSigninBox();	
 	};

});
