angular.module('Coffeechat.dashboard', [])
.controller('dashboardCtrl', function($scope, $state, dashboardFactory){
	dashboardFactory.getUser().then(function(data){
		console.log('data' + data.data.favoriteCoffee);
	});

})