var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// Define how to log events
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  extended: true
}));


// Load all routes in the routes directory
fs.readdirSync('./routes').forEach(function(file) {
  // There might be non-js files in the directory that should not be loaded
  if (path.extname(file) == '.js') {
    console.log("Adding routes in " + file);
    require('./routes/' + file).init(app);
  }
});


app.listen(3000, function() {
  console.log('Ready to start helping people manage their time!');
});