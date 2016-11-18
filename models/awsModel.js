//var AWSKey = "";
//var AWSSecret = "";

var bucketName = 'droper';
var bucketRegion = 'us-west-2';
var path = require('path');


var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('secrets/config.json');
// Create S3 service object
var s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});
console.log("AWS config succesful");

//upload_test('pictures/fire.jpg');

function upload_test(file) {


  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: bucketName,
    Key: '',
    Body: ''
  };
  var fileStream = fs.createReadStream(file);
  fileStream.on('error', function(err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(file);

  // call S3 to retrieve upload file to specified bucket
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });


}

//download_test("fire.jpg");

function download_test(imageName) {

  s3.getObject({
      Bucket: bucketName,
      Key: imageName
    },
    function(error, data) {
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        // File is loaded into data,
        //can be written to disk or passed straight to user.
      }
    }
  );
}









/*  old method for AUTH, leftover from uploader lib
exports.get_keys = function() {
  keyFile = fs.readFile('secrets/accessKey.secret', function(err, data) {
    AWSKey = data;
    //console.log("AWS Key is " + data);
    secretsFile = fs.readFile('secrets/secret.secret', function(err, data) {
      AWSSecret = data;
      //console.log("Aws Secret is " + data);
      console.log("AWS auth ready to go");
    });
  });
}
*/