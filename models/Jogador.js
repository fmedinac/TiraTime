/**
 * Jogador
 *
 * @module      :: Model
 * @description :: Represent data model for the Tshirts
 * @author        :: Kevin Blanco
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Jogador = new Schema({

  nome:    {
    type    : String,
    require : true
  },
  rating:     {
    type    : Number,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

// Jogador.path('model').validate(function (v) {
//   return ((v != "") && (v != null));
// });

module.exports = mongoose.model('Jogador', Jogador);