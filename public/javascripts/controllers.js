 // Managing the poll list
        function JogadoresListCtrl($scope, Jogador) {
          $scope.jogadores = Jogador.query();
        }
        // Voting / viewing poll results
        function JogadorEditCtrl($scope, $routeParams, Jogador) {
          $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId});

          console.log($scope.jogador.$get());

          // $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId});
        // $scope.entry = Movie.get({ id: $scope.id }, function() {
        //   // $scope.entry is fetched from server and is an instance of Entry
        //   $scope.entry.data = 'something else';
        //   $scope.entry.$update(function() {
        //     //updated in the backend
        //   });
        // });
          // $scope.editJogador = function() {
          //   $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId}, function(){
          //     $scope.jogador.nome = 'something else';
          //     $scope.jogador.$update(function() {
          //       //updated in the backend
          //       console.log("saved");
          //     });
          //   });
          // //   console.log("EDITAR");
          // //   var jogador = $scope.jogador;
          // //   if(jogador.nome.length && jogador.rating != 0){
          // //     console.log(jogador.nome);
          // //       console.log(jogador.nome);
          // //       // Jogador.update({_id: $scope.jogador._id}, {nome:jogador.nome});
          // //       Jogador.save(jogador);
          // //   } else {
          // //     alert('Jogador sem nome ou sem nota?');
          // //   }
          // };


          $scope.deletarJogador = function() {
            console.log($scope);

            var deletarJogador = Jogador.get({_id: $routeParams.jogadorId}, function(jogador){
              // console.log(jogador);
              // jogador.$delete(function(p, resp) {
              //   if(!p.error) { 
              //     $location.path('jogadores');
              //   } else {
              //     alert('Deu pau :(');
              //   }
              // });
            })
          }
        }
        // Creating a new jogador
        function JogadorNewCtrl($scope, $location, Jogador) {
          $scope.jogador = {
            nome: '',
            rating: 0
          };  
          $scope.createJogador = function() {
            var jogador = $scope.jogador;
            if(jogador.nome.length && jogador.rating != 0){
              var novoJogador = new Jogador(jogador);
          console.log(Jogador);
              novoJogador.$save(function(p, resp) {
                if(!p.error) { 
                  $location.path('jogadores');
                } else {
                  alert('Deu pau :(');
                }
              });
            } else {
              alert('Jogador sem nome ou sem nota?');
            }
          };
        }