'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  name: String,
  message: String,
  time: String
});



module.exports = mongoose.model('Message', messageSchema); 