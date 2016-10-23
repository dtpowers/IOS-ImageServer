var db = require("../models/mongooseModel.js")

exports.init = function(app) {
  app.post('/postPhoto', function(req, res) {
    processImage(req);
    res.send("image upload succesful");
  });
}

function processImage(req) {
  return true;

}