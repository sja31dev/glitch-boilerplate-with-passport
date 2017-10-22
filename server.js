

/*var fs = require('fs');*/
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var passportGithub = require('./auth/github');
var passportTwitter = require('./auth/twitter');
var passportFacebook= require('./auth/facebook');

var app = express();

// express-session and passport middleware
app.use(session({
  secret: 'fjviosnfiur094enak',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// *** mongoose *** //
mongoose.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_SERVER + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {useMongoClient: true});

// ROUTES

//GITHUB
app.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));
app.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

//TWITTER
app.get('/auth/twitter', passportTwitter.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

//FACEBOOK
app.get('/auth/facebook', passportFacebook.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

app.get('/api/me',
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

app.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

app.get('/:string', function(req, res) {
  
  res.sendStatus(500);
});

  
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

