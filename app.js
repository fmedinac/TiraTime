var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var livereload = require('express-livereload');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/peladaHuge');

var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set up the RESTful API, handler methods are defined in api.js
// var api = require('./controllers/api.js');
// app.post('/thread', api.jogador);
// app.get('/thread/:title.:format?', api.show);
// app.get('/thread', api.list);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.use('/users', users);

// app.get('/polls/polls', routes.list);
// app.get('/polls/:id', routes.poll);
// app.post('/polls', routes.create);

app.get('/jogadores/jogadores', routes.list);
app.get('/jogadores/:id', routes.item);
app.post('/jogadores', routes.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// module.exports = app;

livereload(app, {
    watchDir: process.cwd()
});