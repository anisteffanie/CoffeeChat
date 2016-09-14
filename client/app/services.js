angular.module('Coffeechat.services', [])
.factory('authFactory', function($http){
	var userSignup = function(userInfo){
		return $http.post('/api/signup', userInfo);
   };

	var userSignin = function(){};
	
	return {
		userSignup: userSignup
	}
})