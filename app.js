var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();


//add routes
fs.readdirSync('./routes').forEach(function(file) {
  // There might be non-js files in the directory that should not be loaded
  if (path.extname(file) == '.js') {
    console.log("Adding routes in " + file);
    require('./routes/' + file).init(app);
  }
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});



app.listen(3000, function() {
  console.log('and away we go!');
});