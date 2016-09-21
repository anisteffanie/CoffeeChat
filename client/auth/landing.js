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
 		console.log(newUser)
 		if($scope.firstName === undefined || $scope.firstName === "") {
 			$scope.signupError = 'what\'s your first name?';
 			angular.element(document.querySelector('.firstname')).addClass('inputError');
 			
		}
 		else if($scope.lastName === undefined || $scope.lastName === ""){
 			$scope.signupError = 'what\'s your last name?';
 			console.log('lastname ' + $scope.lastName)
 			angular.element(document.querySelector('.lastname')).addClass('inputError');
 		}
 		else if($scope.signupUsername === undefined ||  $scope.signupUsername === ""){
 			$scope.signupError = 'please choose a username';

 			angular.element(document.querySelector('.signupUsername')).addClass('inputError');
 		}
 		else if($scope.signupPassword === undefined || $scope.signupPassword === ""){
 			$scope.signupError = 'please choose a password'; 
 			angular.element(document.querySelector('.signupPassword')).addClass('inputError');
 		}
 		else {
 			authFactory.userSignup(newUser)
 			.then(function(data){
 				console.log('data ' + data.data);
 			});
 			
 		}
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

 	$scope.clearError = function(){
 		angular.element(document).find('input').removeClass('inputError')
 	}

});
