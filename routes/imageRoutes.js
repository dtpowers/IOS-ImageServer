exports.init = function(app) {
  app.post('/postPhoto', function(req, res) {
    processImage(req);
    res.send("image upload succesful");
  });
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ios');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

function processImage(req) {
  return true;

}