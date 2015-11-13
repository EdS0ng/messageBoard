'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/messageDB');

var app = express();

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));


app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
