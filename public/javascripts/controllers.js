 // Managing the poll list
        function JogadoresListCtrl($scope, Jogador) {
          $scope.jogadores = Jogador.query();
        }
        // Voting / viewing poll results
        function PollItemCtrl($scope, $routeParams, Jogador) {
          $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId});
        }
        // Creating a new poll
        function PollNewCtrl($scope, $location, Jogador) {
          $scope.jogador = {
            nome: '',
            rating: 0
          };  
          $scope.createPoll = function() {
            var poll = $scope.poll;
            if(poll.question.length > 0) {
              var choiceCount = 0;
              for(var i = 0, ln = poll.choices.length; i < ln; i++) {
                var choice = poll.choices[i];        
                if(choice.text.length > 0) {
                  choiceCount++
                }
              }    
              if(choiceCount > 1) {
                var newPoll = new Poll(poll);       
                newPoll.$save(function(p, resp) {
                  if(!p.error) { 
                    $location.path('polls');
                  } else {
                    alert('Could not create poll');
                  }
                });
              } else {
                alert('You must enter at least two choices');
              }
            } else {
              alert('You must enter a question');
            }
          };
          $scope.createJogador = function() {
            var jogador = $scope.jogador;
            if(jogador.nome.length && jogador.rating != 0){
              var novoJogador = new Jogador(jogador);
              novoJogador.$save(function(p, resp) {
                if(!p.error) { 
                  $location.path('polls');
                } else {
                  alert('Deu pau :(');
                }
              });
            } else {
              alert('Jogador sem nome ou sem nota?');
            }
          };
        }