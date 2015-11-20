	var myApp = angular.module('myApp',['ngRoute','firebase']);

	myApp.run(["$rootScope", "$location", function($rootScope, $location) {
		$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		  // We can catch the error thrown when the $requireAuth promise is rejected
		  // and redirect the user back to the home page
		  if (error === "AUTH_REQUIRED") {
		    $location.path("/");
		  }
		});
	}]);

		myApp.config(function($routeProvider,$locationProvider){
			$routeProvider
			.when('/',{
				templateUrl:'views/login.html',
				controller:'authenController'
			})
			.when('/login',{
				templateUrl:'views/login.html',
				controller:'authenController'
			})
			.when('/todo',{
				templateUrl:'views/todo.html',
				controller:'testController',
				resolve: {
				    // controller will not be loaded until $waitForAuth resolves
				    // Auth refers to our $firebaseAuth wrapper in the example above
				    currentAuth: ["Auth", function(Auth) {
				      // $waitForAuth returns a promise so the resolve waits for it to complete
				      return Auth.$requireAuth();
				    }]
				  }
			});
		});


		myApp.factory("Auth", ["$firebaseAuth",
		  function($firebaseAuth) {
		    var fRef = new Firebase('https://dontodo.firebaseio.com/');
		    return $firebaseAuth(fRef);
		  }
		]);

		myApp.controller('testController',function($scope,$firebaseArray,$firebaseAuth,$location,$rootScope,currentAuth,Auth){
			var fRef = new Firebase('https://dontodo.firebaseio.com/todo');
			$scope.data = $firebaseArray(fRef);
			$scope.authObj = Auth;

			$scope.authObj.$onAuth(function(authData){
				$scope.useremail = authData.password.email;
			});

			$scope.addTodo = function(){
				//create id
				var timeStamp = new Date().valueOf();
				//add to firebase
				$scope.data.$add({
					id:timeStamp,
					title:$scope.newTodo,
					status:'pending',
					email:$scope.useremail
				});
				//clear todo
				$scope.newTodo = '';
			}

			$scope.remove = function(d){

				//check if the item is valid
				if (d.id == undefined)return;

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
			/*tabs*/
			$scope.tab = 1;
			$scope.tabOpen = function(tabNo){
					$scope.tab = tabNo;
			}

			$scope.logout = function(){
				$scope.authObj.$unauth();
				$location.path('/');
				$scope.authObj.$onAuth(function(authData) {
				  if (authData) {
				    console.log("Logged in as------------:", authData.uid);
				  } else {
				    console.log("Logged out!!!");
				  }
				});
			}
		});
		

		myApp.controller('authenController',function($scope,$firebaseArray,$firebaseAuth,$location,Auth,$rootScope){
			var uRef = new Firebase('https://dontodo.firebaseio.com/users');
			$scope.data = $firebaseArray(uRef);
			$scope.authObj = Auth;

			/*create account*/
			$scope.createAccount = function(email,accountPassword){
				//create id

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
				  $location.path('/todo');
				}).catch(function(error) {
				  console.error("Error: ", error);
				});
				
				
			}

			/*login account*/
			$scope.login = function(username,password){
				$scope.authObj.$authWithPassword({
				  email: username,
				  password: password
				}).then(function(authData) {
				  console.log("Logged in as:", authData.uid);
				  $location.path('/todo');
				}).catch(function(error) {
				  console.error("Authentication failed:", error);
				  if(error.code == 'INVALID_USER' || error.code == 'INVALID_PASSWORD'){
				  	$scope.loginError = 'Your username or password is incorrect';
				  }
				  //console.log($scope);
				});
				//console.log($scope);

			}

			/*tabs*/
			$scope.tab = 1;
			$scope.tabOpen = function(tabNo){
					$scope.tab = tabNo;
			}
		});

