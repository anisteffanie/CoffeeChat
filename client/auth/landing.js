angular.module('Coffeechat.landing', [])
.controller('landingCtrl', function($scope, $state, authFactory){
	console.log('landing page')
	
	$scope.signupBox = false;
	$scope.signNav = true;
	
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
 		}
 		console.log(newUser);
 		authFactory.userSignup(newUser)
 		.then(function(data){
 			console.log(data.data)
 		});
 		$scope.hideSignupBox();
 	};

});
