/**
 * Jogador
 *
 * @module      :: Model
 * @description :: Represent data model for the Tshirts
 * @author        :: Kevin Blanco
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Pelada = new Schema({

  jogadores:    {
    type    : Array,
    require : true
  },
  portime:     {
    type    : Number,
    require : true
  },
  times: {
    type: Array
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

// Pelada.path('model').validate(function (v) {
//   return ((v != "") && (v != null));
// });

module.exports = mongoose.model('Pelada', Pelada);