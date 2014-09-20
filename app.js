var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('test');
var mongoose = require('mongoose');
var swig = require('swig');

var routes = require('./routes/index');
var users = require('./routes/user');

var app = express();

// view engine setup
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app/views'));

// Disabled Swig's template caching, using Express's caching instead. 
// Turn one on to 'true' in production. 
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
app.use('/auth', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + app.get('port'));
});


module.exports = app;