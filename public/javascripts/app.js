angular.module('jogadores', ['pollServices'])
          .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
              when('/jogadores', { templateUrl: 'partials/list.html', controller: 
JogadoresListCtrl }).
              when('/jogadores/:jogadorId', { templateUrl: 'partials/item.html', controller: 
PollItemCtrl }).
              when('/novoJogador', { templateUrl: 'partials/new.html', controller: 
PollNewCtrl }).
              otherwise({ redirectTo: '/jogadores' });
          }]);