var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/JoeBlog';
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var serveStatic = require('serve-static');




mongoose.connect(dbUrl,function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('connect to JoeBlog')
    }

})




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(session({
    secret: 'JoeBlog',
    cookie:{maxAge:1000000},
    resave:false,
    saveUninitialized:true,
    store:new mongoStore({
      url:dbUrl,
      collection:'sessions'
    })
}))

require('./config/routes')(app);

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
  app.set('showStackError',true);
  app.locals.pretty = true;
  mongoose.set('debug',true);
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


app.listen(3000);
