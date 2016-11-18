//Pretty much enviornment vars for AWS authentication
//Scraped from files in secrets folder
var bucketName = 'droper';
var bucketRegion = 'us-west-2';
var AWSKey = "";
var AWSSecret = "";


var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('secrets/config.json');

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: bucketName
  }
});

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


var doError = function(e) {
  console.error("ERROR: " + e);
  throw new Error(e);
}