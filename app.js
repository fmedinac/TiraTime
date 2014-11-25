/*
 * Main App file App.js
 * @author Kevin Blanco
 */


// Dependencies requirements, Express 4
var express        	= require('express');
var morgan         	= require('morgan');
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var mongoose        = require("mongoose");
var path			= require('path');
var jade			= require('jade');
var routes			= require('./routes/index');

var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.listen(8080);
console.log('Im listening on port 8080');

// Home
app.use('/', routes);

// MongoDB configuration
mongoose.connect('mongodb://localhost/tira-time', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

var routes = require('./routes/jogador')(app);