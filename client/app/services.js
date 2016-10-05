angular.module('Coffeechat.services', [])
.factory('authFactory', function($http){
	var userSignup = function(userInfo){

		return $http.post('/api/signup', userInfo);
   };

	var userSignin = function(userInfo){
		return $http.post('/api/signin', userInfo);
	};

	var requestCsrf = function(){
		return $http.get('/api/signup/csrf');
	}
	
	return {
		userSignup: userSignup,
		userSignin: userSignin
		
	}
})
.factory('dashboardFactory', function($http){
	var getUser = function(userInfo){
		return $http.get('/api/dashboard/getUser');
	}

	var postEdit = function(editThis){
		return $http.post('/api/dashboard/editProfile', editThis);
	}

	var postProfilePic = function(photo){
		return $http.post('/api/dashboard/addPhoto', photo);


		
	}
	return {
		getUser: getUser,
		postEdit: postEdit,
		postPhoto: postProfilePic
	}
})