var mongoose = require('mongoose');

exports.JogadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  rating: { type: String, required: true }
});