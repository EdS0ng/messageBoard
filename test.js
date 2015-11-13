myFunc(function(err, data){
  if(err){
    console.log('ERROR:', err);
  } else {
    console.log('DATA:', data);
  }
});

var request = require('request');

function myFunc(callback){
  request.get('/api thing', function(err, data){
    callback(err, data);
  })
  request.get('/api thing', cb);

  // var num = Math.floor(Math.random() * 5);

  // if(num === 0){
  //   cb("OMG IT'S AN ERROR");
  // } else {
  //   cb(null, [1,2,3,4])
  // }
}
