angular.module('jogadoresServices', ['ngResource'])
	.factory('Jogador', function($resource) {
		return $resource('/api/jogadores/:jogadorId', {}, {
		  query: { method: 'GET', params: { jogadorId: 'jogadores' }, isArray: true },
		  update: { method: 'PUT', params: { jogadorId: 'jogadores' } }
		})
	})
	.factory('Pelada', function($resource) {
		return $resource('/api/peladas/:peladaId', {}, {
		  query: { method: 'GET', params: { peladaId: 'peladas' }, isArray: true },
		  update: { method: 'PUT', params: { peladaId: 'peladas' } }
		})
	});
// angular.module('jogadoresServices', ['ngResource'])
// 	.factory('Jogador', function($resource) {
// 		return $resource('/api/jogadores/:jogadorId', {}, {
// 		  query: { method: 'GET', params: { jogadorId: 'jogadores' }, isArray: true }
// 		})
// 	});
