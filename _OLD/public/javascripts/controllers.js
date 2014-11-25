 // Managing the poll list
        function JogadoresListCtrl($scope, Jogador) {
          $scope.jogadores = Jogador.query();
        }
        // Voting / viewing poll results
        function PollItemCtrl($scope, $routeParams, Jogador) {
          $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId});
        // $scope.entry = Movie.get({ id: $scope.id }, function() {
        //   // $scope.entry is fetched from server and is an instance of Entry
        //   $scope.entry.data = 'something else';
        //   $scope.entry.$update(function() {
        //     //updated in the backend
        //   });
        // });
          $scope.editJogador = function() {
            $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId}, function(){
              $scope.jogador.nome = 'something else';
              $scope.jogador.$update(function() {
                //updated in the backend
                console.log("saved");
              });
            });
          //   console.log("EDITAR");
          //   var jogador = $scope.jogador;
          //   if(jogador.nome.length && jogador.rating != 0){
          //     console.log(jogador.nome);
          //       console.log(jogador.nome);
          //       // Jogador.update({_id: $scope.jogador._id}, {nome:jogador.nome});
          //       Jogador.save(jogador);
          //   } else {
          //     alert('Jogador sem nome ou sem nota?');
          //   }
          };
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