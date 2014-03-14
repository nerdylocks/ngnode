"use strict";

var ngnode = angular.module('ngnode', [
	'ngResource',
	'ngSanitize',
	'ngRoute'
]);

ngnode.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'index.html',
		controller: 'mainCtrl'
	})
	.when('/wolf', {
		templateUrl: 'wolf.html',
		controller: 'wolfCtrl'
	});
});

ngnode.controller('mainCtrl', function($rootScope, $scope, $http){
	$scope.formData = {};

	$scope.listTodos = function(){
		$http.get('/api/todos')
		.success(function(data){
			$rootScope.todos = data;
		})
		.error(function(data){
			console.log('ERROR: ' + data);
		});
		console.log("list loaded");
	}
	$scope.listTodos();
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$rootScope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('ERROR: ' + data);	
		});
	}

	$scope.update = function(id){
		$http.put('/api/todo/' + id, $rootScope.todos)
		.success(function(data){
			$rootScope.todos = data;
		})
		.error(function(data){
			console.log('ERROR: ' + data);	
		});
	}

	$scope.delete = function(id){
		$http.delete('/api/todo/' + id)
		.success(function(data){
			$rootScope.todos = data;
			console.log(data);

		})
		.error(function(data){
			console.log('ERROR ' + data);
		});
	}
});

ngnode.controller('mainCtrl', function($rootScope, $scope, $http){
	
});