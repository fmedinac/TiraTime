/* The API controller
   Exports 3 methods:
   * post - Creates a new thread
   * list - Returns a list of threads
   * show - Displays a thread and its posts
*/
 
 
var Thread = require('../models/thread.js');
var Jogador = require('../models/jogador.js');
 
exports.jogador = function(req, res) {
  var jogador = new Jogador({name: req.body.name, rating: req.body.rating});
  jogador.save(function(err, saved) {
    if(err) {
      res.send(500);
    } else {
      console.log(saved);
      res.send(200);
    }
  })
}
 
exports.listaJogadores = function(req, res) {
  Jogador.find(function(err, jogadores) {
    res.send(jogadores);
  });
}

exports.getListaJogadores = function(callback) {
  Thread.find(function(err, threads) {
    callback(jogadores);
  });
}
 
// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
        var posts = Post.find({thread: thread._id}, function(error, posts) {
          res.send([{thread: thread, posts: posts}]);
        });
    })
});