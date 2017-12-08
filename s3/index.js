var fs = require('fs');
var AWS = require('aws-sdk');
require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});
var s3 = new AWS.S3();
console.log('cred: ', process.env.ACCESS_KEY_ID)


fs.readdir('./sample-set', function(err, items) {
  items.forEach(file => {
    fs.readFile('./sample-set/' + file, function(err, data) {
      if (err) throw err; // Something went wrong!

      var s3bucket = new AWS.S3({
        params: {
          Bucket: 'mike-hadlee-7000-files'
        }
      });
      s3bucket.createBucket(function() {
        var params = {
          Key: file,
          Body: data
        };
        s3bucket.upload(params, function(err, data) {
          // Whether there is an error or not, delete the temp file
          fs.unlink(file, function(err) {
            if (err) {
              console.error(err);
            }
            console.log('Temp File Delete');
          });

          console.log("PRINT FILE:", file);
          if (err) {
            console.log('ERROR MSG: ', err);
            // res.status(500).send(err);
          } else {
            console.log('Successfully uploaded data');
            // res.status(200).end();
          }
        });
      });
    });
  })
});
