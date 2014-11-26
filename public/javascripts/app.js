angular.module('jogadores', ['jogadoresServices'])
		.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', { templateUrl: 'partials/list.html', controller: 
		JogadoresListCtrl }).
			when('/jogadores/:jogadorId', { templateUrl: 'partials/item.html', controller: 
		JogadorEditCtrl }).
			when('/novoJogador', { templateUrl: 'partials/new.html', controller: 
		JogadorNewCtrl }).
			when('/novaPelada', { templateUrl: 'partials/novaPelada.html', controller: 
		PeladaNewCtrl }).
			when('/peladas/:peladaId', { templateUrl: 'partials/pelada.html', controller: 
		PeladaEditCtrl }).
			otherwise({ redirectTo: '/' });
		}]);