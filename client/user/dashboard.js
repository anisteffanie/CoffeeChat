angular.module('Coffeechat.dashboard', [])
.controller('dashboardCtrl', function($scope, $state, dashboardFactory, $compile, Upload, $timeout){
	$scope.userInfo;
	$scope.dbEdit;
	
	dashboardFactory.getUser().then(function(data){
		$scope.userInfo = data.data;
		
	});

	dashboardFactory.getPhoto().then(function(data){
		$scope.profileImage = data.data;
	})

    //user edits his/her profile from the dashboard
	$scope.editProfile = function(tag, iconId, dbedit) {
		//create an input element to replace the text to make the area editable
		var input = document.createElement('input');
		var model = document.createAttribute('ng-model');
		model.value = 'edited';
		$scope.dbEdit = dbedit;
		input.setAttributeNode(model);
		angular.element(document.getElementById(tag)).replaceWith(input);
		$compile(input)($scope);

		//replacing edit icon
		var checkMarkIcon = document.createElement('img');
		
		var checkMarkSrc = document.createAttribute('src');
		checkMarkSrc.value = './assets/checkmark.png';
		checkMarkIcon.setAttributeNode(checkMarkSrc);
		
		var checkMarkClass = document.createAttribute('class');
		checkMarkClass.value = 'editIcon';
		checkMarkIcon.setAttributeNode(checkMarkClass);

		checkMarkAction = document.createAttribute('ng-click');
		checkMarkAction.value = 'postEdit()';
		checkMarkIcon.setAttributeNode(checkMarkAction);
		console.log(checkMarkIcon)
		angular.element(document.getElementById(iconId)).replaceWith(checkMarkIcon);
		$compile(checkMarkIcon)($scope);
	}

	//send the edit ro db
	$scope.postEdit = function(){
		var editThis = {
			tobeEdited: $scope.dbEdit,
			newValue: $scope.edited
		};
		dashboardFactory.postEdit(editThis);
		$state.reload();
	};
    
	// adding a profile pic
	$scope.uploadImg = function(){
		var file = document.getElementById('imgFile').files[0];
		var reader = new FileReader()
		reader.onloadend = function(e){
   	 		var data = e.target.result;
    			var dataObj = {
    				profilePic: 'profilePic',
    				file: data
    			}
    		dashboardFactory.postPhoto(dataObj).then(function(data){
    			console.log(data.data)
    			$state.reload();
    		});
   		}
  		reader.readAsDataURL(file);
	
	}
})

