exports.init = function(app) {
  app.post('/postPhoto', function(req, res) {
    res.send("image upload succesful");
  });
}