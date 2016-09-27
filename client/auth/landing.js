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
		$scope.firstName = '';
 		$scope.lastName = '';
 		$scope.signupUsername = '';
 		$scope.signupPassword = '';
 		$scope.favCoffee = '';
 		$scope.signupError = '';
 	};
 	$scope.userSignup = function(){
		var newUser = {
 			firstName: $scope.firstName,
 			lastName: $scope.lastName,
 			username: $scope.signupUsername,
 			password: $scope.signupPassword,
 			favoriteCoffee: $scope.favCoffee
 		};
 		
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
 				if(data.data === 'Username is taken'){
 					angular.element(document.querySelector('.signupUsername')).addClass('inputError');
 					$scope.signupError = 'Username "' + $scope.signupUsername + '" is taken. Please try another one.'
 				}
 				else {
 					$scope.hideSignupBox();
 				}
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
		$scope.signinUsername = '';
		$scope.signinPassword = '';
		$scope.signinError = '';
 	};
 	$scope.userSignin = function(){
 		var user = {
 			username: $scope.signinUsername,
 			password: $scope.signinPassword	
		};
		if($scope.signinUsername === undefined || $scope.signinUsername === ""){
			$scope.signinError = 'Please enter your username';
			angular.element(document.querySelector('.signinUsername')).addClass('inputError');
 		
		}
		else if($scope.signinPassword === undefined || $scope.signinPassword === ""){
			$scope.signinError = 'Please enter your password';
			angular.element(document.querySelector('.signinPassword')).addClass('inputError');
		}
		else {
			authFactory.userSignin(user).then(function(data){
				if(data.data === 'user does not exist'){
					$scope.signinError = 'User "' + $scope.signinUsername + '" does not exist.';
					angular.element(document.querySelector('.signinUsername')).addClass('inputError');
				}
				else if(data.data = 'wrong password'){
					$scope.signinError = 'Wrong password. Please try again.';
					angular.element(document.querySelector('.signinPassword')).addClass('inputError');
				}
				else {
					$scope.hideSigninBox();	
					$state.go('dashboard');
				}
			});
		}
 	};

 	$scope.clearError = function(){
 		angular.element(document).find('input').removeClass('inputError');
 	}

});
