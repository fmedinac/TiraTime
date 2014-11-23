angular.module('pollServices', ['ngResource'])
	.factory('Poll', function($resource) {
		return $resource('polls/:pollId', {}, {
		  query: { method: 'GET', params: { pollId: 'polls' }, isArray: true }
		})
	})
	.factory('Jogador', function($resource) {
		return $resource('jogadores/:jogadorId', {}, {
		  query: { method: 'GET', params: { jogadorId: 'jogadores' }, isArray: true }
		})
	})
	;
