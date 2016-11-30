var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// Define how to log events
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 1000000, // experiment with this parameter and tweak
  extended: true
}));

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

//initialize AWS connection

// Load all routes in the routes directory
fs.readdirSync('./routes').forEach(function(file) {
  // There might be non-js files in the directory that should not be loaded
  if (path.extname(file) == '.js') {
    console.log("Adding routes in " + file);
    require('./routes/' + file).init(app);
  }
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Droplet API all ready to go on port ' + port);
});