/**
 * Jogador
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author        :: Kevin Blanco
 */

var Pelada = require('../models/pelada.js');

module.exports = function(app) {


  /**
   * Find and retrieves all tshirts
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllPeladas = function(req, res) {
    console.log("GET - /peladas");
    return Pelada.find().sort({modified: -1}).exec(function(err, peladas) {
      if(!err) {
        return res.send(peladas);
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
  findPeladaById = function(req, res) {

    console.log("GET - /peladas/:id");
    return Pelada.findById(req.params.id, function(err, pelada) {

      if(!pelada) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send(pelada);
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
  addPelada = function(req, res) {

    console.log('POST - /peladas');

    var pelada = new Pelada({
      jogadores:    req.body.jogadores,
      portime:    req.body.portime
    });

    pelada.save(function(err) {

      if(err) {

        console.log('Error while saving pelada: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("pelada created");
        return res.send({ status: 'OK', pelada:pelada });

      }

    });

  };



  /**
   * Update a tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updatePelada = function(req, res) {

    console.log("PUT - /peladas/:id");
    return Pelada.findById(req.params.id, function(err, pelada) {

      if(!pelada) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      console.log(req);

      if (req.body.jogadores != null) pelada.jogadores = req.body.jogadores;
      if (req.body.portime != null) pelada.portime = req.body.portime;
      if (req.body.times != null) pelada.times = req.body.times;

      pelada.modified = Date.now();

      return pelada.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', pelada:pelada });
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

        res.send(pelada);

      });
    });
  };



  /**
   * Delete a tshirt by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deletePelada = function(req, res) {

    console.log("DELETE - /peladas/:id");
    return Pelada.findById(req.params.id, function(err, pelada) {
      if(!pelada) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return pelada.remove(function(err) {
        if(!err) {
          console.log('Removed pelada');
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
  app.get('/api/peladas/peladas', findAllPeladas);
  app.get('/api/peladas/:id', findPeladaById);
  app.post('/api/peladas', addPelada);
  app.put('/api/peladas/:id', updatePelada);
  app.delete('/api/peladas/:id', deletePelada);

}