

/*var fs = require('fs');*/
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var app = express();

var Schema = mongoose.Schema;


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

// create User Schema
var User = new Schema({
  name: String,
  someID: String
});

module.exports = mongoose.model('users', User);

app.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

app.get('/:string', function(req, res) {
  
  res.sendStatus(500);
});

  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })


// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

