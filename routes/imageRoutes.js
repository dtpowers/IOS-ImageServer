// include my model for this application
var mongoModel = require("../models/mongoModel.js");
var AWSModel = require("../models/awsModel.js");
var fs = require('fs');
// Define the routes for this controller
exports.init = function(app) {
  app.get('/api/db/:collection', doRetrieve); // CRUD Retrieve

  app.put('/api/db/:collection', doCreate); // CRUD Create

  app.post('/api/db/:collection', doUpdate); // CRUD Update

  app.delete('/api/db/:collection', doDelete); //CRUD Delete

  app.post('/api/image', getImage);

  app.get('/', home);

}

home = function(req, res) {
  res.send("The app is working in deploy!");
}


getImage = function(req, res) {
  //imageData = "";
  console.log(req.body.filename);
  b64string = req.body.imageData;
  fs.writeFile("pictures/test.txt", b64string, function(err) {
    console.log("itxt saved!");
  });
  fs.writeFile("pictures/test.jpeg", new Buffer(b64string, "base64"), function(err) {
    console.log("image saved!");
    res.send("hi Max");
  });


  //res.send("hi Max");

}

/**
test ajax call to put data in db
$.ajax({
  url: "/api/users/",
  data: tempUser,
  type: 'PUT',
  success: function(result) {

    console.log(result);

  }
});

*/


doCreate = function(req, res) {

  console.log("1. Starting doCreate in dbRoutes");

  if (Object.keys(req.body).length == 0) {
    res.send(false);
    return;
  }



  mongoModel.create(req.params.collection,
    req.body,
    function(result) {
      res.send(result);


      console.log("2. Done with callback in dbRoutes create");
    });
  console.log("3. Done with doCreate in dbRoutes");
}



doRetrieve = function(req, res) {

  mongoModel.retrieve(
    req.params.collection,
    req.query,
    function(modelData) {
      res.send(modelData);
    });
}

doUpdate = function(req, res) {
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};
  // if there no update operation defined, render an error page.
  if (!req.body.update) {
    res.render('message', {
      title: 'Mongo Demo',
      obj: "No update operation defined"
    });
    return;
  }
  var update = JSON.parse(req.body.update);

  mongoModel.update(req.params.collection, filter, update,
    function(status) {
      res.send(status);
    });
}


doDelete = function(req, res) {
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.find ? JSON.parse(req.body.find) : {};


  mongoModel.Mdelete(req.params.collection, filter,
    function(status) {
      res.render('message', {
        title: 'Mongo Demo',
        obj: status
      });
    });
}