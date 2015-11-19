
	var myApp = angular.module('myApp',['firebase']);

		myApp.controller('testController',function($scope,$firebaseArray){
			var fRef = new Firebase('https://dontodo.firebaseio.com/');
			$scope.data = $firebaseArray(fRef);

			$scope.addTodo = function(){
				//create id
				var timeStamp = new Date().valueOf();
				//add to firebase
				$scope.data.$add({
					id:timeStamp,
					title:$scope.newTodo,
					status:'pending'
				});
				//clear todo
				$scope.newTodo = '';
			}

			$scope.remove = function(index,todo){

				//check if the item is valid
				if (todo.id == undefined)return;

				//remove item from list
				$scope.data.$remove(d);
			}

			$scope.start = function(d){
				if(d.id == undefined)return;

				d.status = 'in progress';
				$scope.data.$save(d);
			}

			$scope.complete = function(d){
				if(d.id == undefined)return;

				d.status = 'complete';
				$scope.data.$save(d);
			}

			$scope.tab = 1;
			$scope.tabOpen = function(tabNo){
					$scope.tab = tabNo;
			}

			console.log($scope);
		});
		

		myApp.controller('authenController',function($scope,$firebaseAuth,$location){
			var fRef = new Firebase('https://dontodo.firebaseio.com/');
			$scope.authObj = $firebaseAuth(fRef);

			$scope.createAccount = function(email,accountPassword){
				$scope.authObj.$createUser({
				  email: email,
				  password: accountPassword
				}).then(function(userData) {
				  console.log("User " + userData.uid + " created successfully!");
				  return $scope.authObj.$authWithPassword({
				    email: email,
				    password: accountPassword
				  });
				}).then(function(authData) {
				  console.log("Logged in as:", authData.uid);
				}).catch(function(error) {
				  console.error("Error: ", error);
				});
				console.log($scope);
			}

			$scope.login = function(username,password){
				$scope.authObj.$authWithPassword({
				  email: username,
				  password: password
				}).then(function(authData) {
				  console.log("Logged in as:", authData.uid);
				}).catch(function(error) {
				  console.error("Authentication failed:", error);
				});
				console.log($scope);
			}

			$scope.logout = function(){
				$scope.authObj.$unauth();
				//$location.path('/');
				console.log($scope);
			}
			

			
		});

