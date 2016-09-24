angular.module('Coffeechat.services', [])
.factory('authFactory', function($http){
	var userSignup = function(userInfo){
		return $http.post('/api/signup', userInfo);
   };

	var userSignin = function(userInfo){
		return $http.post('/api/signin', userInfo);
	};
	
	return {
		userSignup: userSignup,
		userSignin: userSignin
	}
})
.factory('dashboardFactory', function($http){
	var getUser = function(userInfo){
		return $http.get('/api/dashboard/getUser');
	}

	return {
		getUser: getUser
	}
})