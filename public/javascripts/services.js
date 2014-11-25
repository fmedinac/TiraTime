angular.module('jogadoresServices', ['ngResource'])
	.factory('Jogador', function($resource) {
		return $resource('/api/jogadores/:jogadorId', {}, {
		  query: { method: 'GET', params: { jogadorId: 'jogadores' }, isArray: true }
		})
	})
	;
