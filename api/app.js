var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/user/login');
var logout = require('./routes/user/logout');
var join = require('./routes/user/join');
var joinCheckEmail = require('./routes/user/join_check/email');
var joinCheckName = require('./routes/user/join_check/name');
var captcha = require('./routes/user/captcha');
var mailer = require('./routes/user/mailer');
var files = require('./routes/files/index');

var app = express();
// view engine setup
// view engine setup
app.engine('html', function (filePath, options, callback) { // 定义模板引擎
  // fs.readFile(filePath, function (err, content) {
  //   if (err) return callback(new Error(err));

  //   // 这是一个功能极其简单的模板引擎
  //   let rendered = content.toString().replace(/{{=([^}}]+)?}}/g, function(s0, s1){
  //       return options[s1];
  //   });

  //   return callback(null, rendered);
  // })
  console.log(options)
  return callback(null, '');
});
app.set('views', path.join(__dirname, 'views')); // 指定视图所在的位置
app.set('view engine', 'html'); // 注册模板引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('Content-Type', 'application/json;charset=utf-8');
// app.set('Access-Control-Allow-Origin', 'yutlee.com, yutlee.cn');
// app.set('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
// app.set('Access-Control-Allow-Headers', 'Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME');
// app.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'key', name: 'key', resave: false, saveUninitialized: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/join', join);
app.use('/join_check/email', joinCheckEmail);
app.use('/join_check/name', joinCheckName);
app.use('/captcha', captcha);
app.use('/mailer', mailer);
app.use('/files', files);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // err.status = 404;
  // next();
  res.status(err.status || 404).json({code: 404, message: '请求页面不存在'});
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


module.exports = app;
