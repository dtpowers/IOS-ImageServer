var AWSKey = "";
var AWSSecret = "";


var get_keys = function() {
  keyFile = fs.readFile('/secrets/accessKey.secret', function(err, data) {
    AWSKey = data;
    console.log("AWS Key is " + data);
    secretsFile = fs.readFile('/secrets/secret.secret', function(err, data) {
      AWSSecret = data;
      console.log("Aws Secret is " + data);
    });
  });


}


var client = new Upload('droper', {
  aws: {
    path: 'images/',
    region: 'us-west-2',
    acl: 'public-read'
  },

  cleanup: {
    versions: true,
    original: true
  },

  original: {
    awsImageAcl: 'private'
  },
  //only save one slightly compressed version
  versions: [{
    maxHeight: 1040,
    maxWidth: 1040,
    format: 'jpg',
    suffix: '-large',
    quality: 80,
    awsImageExpires: 31536000,
    awsImageMaxAge: 31536000
  }]
});


client.upload('/some/image.jpg', {}, function(err, versions, meta) {
  if (err) {
    throw err;
  }

  versions.forEach(function(image) {
    console.log(image.width, image.height, image.url);
    // 1024 760 https://my-bucket.s3.amazonaws.com/path/110ec58a-a0f2-4ac4-8393-c866d813b8d1.jpg 
  });
});


exports.uploadTest = function() {

}

var doError = function(e) {
  console.error("ERROR: " + e);
  throw new Error(e);
}