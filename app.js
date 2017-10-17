var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/home/index');
var posts = require('./routes/home/posts');
var admin = require('./routes/admin/admin');
var cats = require('./routes/admin/cats');
var article = require('./routes/admin/posts')
var users = require('./routes/admin/users')

var app = express();
var session = require("express-session")
app.use(session({
    secret: 'blog',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html',require('ejs').__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));

app.use('/', index);
app.use('/posts', posts);
app.use('/admin/index',checkLogin)
app.use('/admin/index',admin)
app.use('/admin/cats', checkLogin)
app.use('/admin/cats', cats)
app.use('/admin/posts', checkLogin)
app.use('/admin/posts', article)
app.use('/admin/users',users)

// 编写一个中间件，用于判断用户是否有权访问
function checkLogin(req,res,next) {
    if (!req.session.isLogin) {
        res.redirect('/admin/users/login')
    }
    next();
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;