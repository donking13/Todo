
	var myApp = angular.module('myApp',['firebase']);

		myApp.controller('testController',function($scope,$firebaseArray){
			var fRef = new Firebase('https://dontodo.firebaseio.com/');
			$scope.data = $firebaseArray(fRef);
			$scope.addTodo = function(){

				$scope.data.$add({'title':$scope.newTodo,'done':false});
				$scope.newTodo = '';
			}
			$scope.remove = function(d){
				$scope.data.$remove(d)
			}
			console.log($scope);
		});
		console.log('hello!');

