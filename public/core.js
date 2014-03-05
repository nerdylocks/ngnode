"use strict";

var ngnode = angular.module('ngnode', []);

ngnode.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'index.html',
		controller: 'mainCtrl'
	});
});

ngnode.controller('mainCtrl', function($scope, $http){
	$scope.formData = {};

	$http.get('/api/todos')
	.success(function(data){
		$scope.todos = data;
	})
	.error(function(data){
		console.log('ERROR: ' + data);
	});

	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('ERROR: ' + data);	
		});
	}
});