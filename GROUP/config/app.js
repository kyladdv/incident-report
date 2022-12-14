/* Installed 3rd party packages */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');
let session = require('express-session');
let passportLocal = require('passport-local');
let cors = require('cors');
let flash = require('connect-flash');
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let localStrategy = passportLocal.Strategy;
let app = express();

//user model

const userModel = require('../model/user');
let User = userModel.User;

// config mongoDB
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to DB URI

mongoose.connect(DB.URI);
let mongDB = mongoose.connection;
mongDB.on('error',console.error.bind(console,'Connection Error:'));
mongDB.once('open', ()=> {
  console.log('connected to MongoDB');
});

// express session setup
app.use(
  session(
    {
      secret:"KeepSafe",
      saveUninitialized:false,
      resave:false
    }
  )
)

// 

passport.use(User.createStrategy());

// (de)serializing user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// initialize passport and flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let routeRouter = require('../routes/route');



// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/incident', routeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',
  {
	  title:"Error"
  }
  
  );
});

module.exports = app;
