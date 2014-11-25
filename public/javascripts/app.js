angular.module('jogadores', ['jogadoresServices'])
		.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/jogadores', { templateUrl: 'partials/list.html', controller: 
		JogadoresListCtrl }).
			when('/jogadores/:jogadorId', { templateUrl: 'partials/item.html', controller: 
		JogadorEditCtrl }).
			when('/novoJogador', { templateUrl: 'partials/new.html', controller: 
		JogadorNewCtrl }).
			otherwise({ redirectTo: '/jogadores' });
		}]);