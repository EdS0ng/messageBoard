'use strict';

var express = require('express');
var router = express.Router();
var messageModel = require('../models/messageModel');

router.get('/', function(req, res) {
  messageModel.find({}, function(err, messages){
    if (err){
      console.log(err);
    }else{
      console.log(messages);
      res.render("index", {messages: messages});
    }
  });
});

router.post('/', function (req, res){
  console.log(req.body);
  var newPost = new messageModel();
  newPost.name = req.body.name;
  newPost.message = req.body.message;
  newPost.time = req.body.timePosted;

  newPost.save(function (err, message){
    if (err){
      return err;
    }else{
      console.log('saved');
      res.send(message._id);
    }
  });
})

router.put('/', function (req, res){
  console.log(req.body);
  messageModel.findOneAndUpdate({_id: req.body.id},{message: req.body.message, time: req.body.timePosted} , function (err, contact){
    if (err){
      console.log(err);
    }else{
      console.log('contact updated');
      res.send('done');
    }
  });
});


router.delete('/:id', function (req, res){
  messageModel.findByIdAndRemove( req.params.id, function (err,data){
    if (err) {
      return console.log(err)
    }
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
