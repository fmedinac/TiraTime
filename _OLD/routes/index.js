var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'peladaHuge');
var PollSchema = require('../models/Poll.js').PollSchema;
var JogadorSchema = require('../models/Jogador.js').JogadorSchema;
var Poll = db.model('polls', PollSchema);
var Jogador = db.model('jogadores', JogadorSchema);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Pelada Huge' });
});

router.index = function(req, res) {
  res.render('index', {title: 'Polls'});
};
// JSON API for list of polls
router.list = function(req, res) { 
  Jogador.find({}, function(error, jogadores) {
    console.log(jogadores);
    res.json(jogadores);
  });
};
// JSON API for getting a single poll
router.item = function(req, res) {  
  console.log("ITEM");
  var jogadorId = req.params.id;
  Jogador.findById(jogadorId, '', { lean: true }, function(err, jogador) {
    console.log("ITEM ENCONTRADO")
    if(jogador) {
      res.json(jogador);
    } else {
      res.json({error:true});
    }
  });
  Jogador.update(function(err, doc) {
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }   
  });
};
// JSON API for creating a new poll
router.create = function(req, res) {
  var reqBody = req.body,
      jogadorObj = {nome: reqBody.nome, rating: reqBody.rating};
  var jogador = new Jogador(jogadorObj);
  // jogador.save(function(err, doc) {
  //   if(err || !doc) {
  //     throw 'Error';
  //   } else {
  //     res.json(doc);
  //   }   
  // });
  jogador.update(function(err, doc) {
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }   
  });
};

router.put = function(req, res, next) {
  console.log(req);
  var reqBody = req.body,
      jogadorObj = {nome: reqBody.nome, rating: reqBody.rating};
  var jogador = new Jogador(jogadorObj);
  jogador.update(function(err, doc) {
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }   
  });
  // Jogador.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });
};
// router.create = function(req, res) {
//   var reqBody = req.body,
//       choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
//       pollObj = {question: reqBody.question, choices: choices};
//   var poll = new Poll(pollObj);
//   poll.save(function(err, doc) {
//     if(err || !doc) {
//       throw 'Error';
//     } else {
//       res.json(doc);
//     }   
//   });
// };

module.exports = router;