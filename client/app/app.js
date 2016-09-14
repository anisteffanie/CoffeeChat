angular.module('Coffeechat', ['Coffeechat.landing', 'Coffeechat.signup', 'Coffeechat.signin', 'Coffeechat.dashboard', 'Coffeechat.services', 'ui.router', 'ngMaterial', 'angularModalService', 'ngMessages'])
.run(function(){
	
})
.config(function($stateProvider, $urlRouterProvider){
$urlRouterProvider.otherwise('/')
    $stateProvider
	.state('landing', {
		cache: false, 
		url: '/',
		templateUrl: '../auth/landing.html',
		authenticate: false,
		controller: 'landingCtrl'
	})
	.state('signup', {
		cache: false,
		url: '/signup',
		templateUrl: '/../auth/signup.html',
		authenthicate: false,
		controller: 'signupCtrl'
	})
	.state('signin', {
		cache: false,
		url: '/signin',
		templateUrl: '../auth/signin.html',
		authenthicate: false,
		controller: 'signinCtrl'
	})
	.state('dashboard', {
		cache: false,
		url: '/dashboard',
		templateUrl: '../user/dashboard.html',
		controller: 'dashboardCtrl'
	})

})
 