 // Managing the poll list
        function JogadoresListCtrl($scope, Jogador, Pelada) {
          $scope.jogadores = Jogador.query();
          $scope.peladas = Pelada.query();

        }
        // Voting / viewing poll results
        function JogadorEditCtrl($scope, $routeParams, $location, Jogador) {
          console.log($location);
          // $scope = Jogador.query();
          $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId});
          // console.log(jogador.toString());

          // $scope.jogador = Jogador.get({jogadorId: $routeParams.jogadorId});
        // $scope.entry = Movie.get({ id: $scope.id }, function() {
        //   // $scope.entry is fetched from server and is an instance of Entry
        //   $scope.entry.data = 'something else';
        //   $scope.entry.$update(function() {
        //     //updated in the backend
        //   });
        // });
          $scope.editJogador = function() {
            Jogador.get({jogadorId: $routeParams.jogadorId}, function(jogador){
              // console.log(wtf);
              // jogador = $scope.jogador;
              jogador.nome = $scope.jogador.nome;
              jogador.rating = $scope.jogador.rating;
              jogador.$update({jogadorId: jogador._id}, function(p, resp){
                if(!p.error) { 
                  $location.path('/');
                } else {
                  alert('Deu pau :(');
                }
              });
            });
          // $scope.editJogador = function() {
          //   Jogador.get({jogadorId: $routeParams.jogadorId}, function(jogador){
          //     // console.log(wtf);
          //     // jogador = $scope.jogador;
          //     jogador.nome = $scope.jogador.nome;
          //     jogador.rating = $scope.jogador.rating;
          //     jogador.$save({jogadorId: jogador._id}, function(p, resp){
          //       if(!p.error) { 
          //         $location.path('/');
          //       } else {
          //         alert('Deu pau :(');
          //       }
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
          };


          $scope.deletarJogador = function() {
            console.log($scope);

            var deletarJogador = Jogador.get({jogadorId: $routeParams.jogadorId}, function(jogador){
              console.log(jogador);
              jogador.$delete({jogadorId: jogador._id}, function(p, resp) {
                if(!p.error) { 
                  $location.path('/');
                } else {
                  alert('Deu pau :(');
                }
              });
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
                  $location.path('/');
                } else {
                  alert('Deu pau :(');
                }
              });
            } else {
              alert('Jogador sem nome ou sem nota?');
            }
          };
        }
        // Creating a new pelada
        function PeladaNewCtrl($scope, $location, Pelada) {
          $scope.pelada = {
            jogadores: {},
            portime: 0
          };
          $scope.createPelada = function() {
            var pelada = $scope.pelada;

            console.log(pelada);
            if(pelada.jogadores.length && pelada.portime != 0){
              var novaPelada = new Pelada(pelada);

              novaPelada.$save(function(p, resp) {
                if(!p.error) { 
                  $location.path('/peladas/'+p.pelada._id);
                } else {
                  alert('Deu pau :(');
                }
              });
            } else {
              alert('Pelada sem ninguém mesmo?');
            }
          };
        }

        // Voting / viewing poll results
        function PeladaEditCtrl($scope, $routeParams, $location, Pelada) {
          $scope.pelada = Pelada.get({peladaId: $routeParams.peladaId},function(pelada){
            if(pelada.times){
              $scope.times = pelada.times;
            }else{
              $scope.times = [];
            }
          });

          $scope.tirarTime = function(){
            var portime = $scope.pelada.portime,
                jogadores = $scope.pelada.jogadores,
                nTimes = Math.floor($scope.pelada.jogadores.length / portime);

            // primeiro sorteamos a ordem dos jogadores

            var shuffled = shuffle(jogadores);

            // agora ordenamos por qualidade

            var ordered = shuffled.slice(0);
            ordered.sort(function(a,b) {
               return a.rating < b.rating ? 1 : -1;
             //return a.key < b.key?-1:1;   // Asc 
             //return a.key < b.key?1:-1;  // Desc
            });

            // cria os times
            var times = [];
            for(var i = 0; i < nTimes; ++i){
              var time = [];
              times.push(time);
            }

            // distribui times
            var time = 0,
                asc = true;
            for(var i = 0; i < jogadores.length; ++i){
              times[time].push(ordered[i]);
              if(asc) {
                ++time;
                if(time >= nTimes){
                  time = nTimes-1;
                  asc = false;
                }
              }else{
                --time;
                if(time < 0){
                  time = 0;
                  asc = true;
                }
              }

              console.log(time);

            }

            // exibe
            $scope.times = times;
            console.log(times);

            // salva no mongo - agora vem a parte chata hehehe
            Pelada.get({peladaId: $routeParams.peladaId}, function(pelada){
              // console.log(wtf);
              // pelada = $scope.pelada;
              pelada.times = $scope.times;
              pelada.$update({peladaId: pelada._id}, function(p, resp){
                if(!p.error) { 
                  // $location.path('/');
                } else {
                  alert('Deu pau :(');
                }
              });
            });

          }

          function shuffle(array) {
            var counter = array.length, temp, index;

            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);

                // Decrease counter by 1
                counter--;

                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }

            return array;
        }


        //   $scope.editPelada = function() {
        //     Pelada.get({peladaId: $routeParams.peladaId}, function(pelada){
        //       // console.log(wtf);
        //       // pelada = $scope.pelada;
        //       pelada.nome = $scope.pelada.nome;
        //       pelada.rating = $scope.pelada.rating;
        //       pelada.$update({peladaId: pelada._id}, function(p, resp){
        //         if(!p.error) { 
        //           $location.path('/');
        //         } else {
        //           alert('Deu pau :(');
        //         }
        //       });
        //     });
        //   $scope.deletarPelada = function() {
        //     console.log($scope);

        //     var deletarpelada = Pelada.get({peladaId: $routeParams.peladaId}, function(pelada){
        //       console.log(pelada);
        //       pelada.$delete({peladaId: pelada._id}, function(p, resp) {
        //         if(!p.error) { 
        //           $location.path('/');
        //         } else {
        //           alert('Deu pau :(');
        //         }
        //       });
        //     })
        //   }
        }