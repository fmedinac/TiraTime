/**
 * Jogador
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author        :: Kevin Blanco
 */

var Jogador = require('../models/jogador.js');

module.exports = function(app) {


  /**
   * Find and retrieves all tshirts
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllJogadores = function(req, res) {
    console.log("GET - /jogadores");
    return Jogador.find(function(err, jogadores) {
      if(!err) {
        return res.send(jogadores);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findJogadorById = function(req, res) {

    console.log("GET - /jogadores/:id");
    return Jogador.findById(req.params.id, function(err, jogador) {

      if(!jogador) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send(jogador);
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new tshirt from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addJogador = function(req, res) {

    console.log('POST - /jogadores');

    var jogador = new Jogador({
      nome:    req.body.nome,
      rating:    req.body.rating
    });

    jogador.save(function(err) {

      if(err) {

        console.log('Error while saving jogador: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("jogador created");
        return res.send({ status: 'OK', jogador:jogador });

      }

    });

  };



  /**
   * Update a tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateJogador = function(req, res) {

    console.log("PUT - /jogadores/:id");
    return Jogador.findById(req.params.id, function(err, jogador) {

      if(!jogador) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      console.log(req);

      if (req.body.nome != null) jogador.nome = req.body.nome;
      if (req.body.rating != null) jogador.rating = req.body.rating;

      jogador.modified = Date.now();

      return jogador.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', jogador:jogador });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(jogador);

      });
    });
  };



  /**
   * Delete a tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteJogador = function(req, res) {

    console.log("DELETE - /jogadores/:id");
    return Jogador.findById(req.params.id, function(err, jogador) {
      if(!jogador) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return jogador.remove(function(err) {
        if(!err) {
          console.log('Removed jogador');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/api/jogadores/jogadores', findAllJogadores);
  app.get('/api/jogadores/:id', findJogadorById);
  app.post('/api/jogadores', addJogador);
  app.put('/api/jogadores/:id', updateJogador);
  app.delete('/api/jogadores/:id', deleteJogador);

}