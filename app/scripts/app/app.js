
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
			console.log($scope);
		});
		console.log('hello!!!!');

