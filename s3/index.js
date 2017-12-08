// var fs = require('fs');
// var AWS = require('aws-sdk');
// require('dotenv').config()
//
// var express = require('express');
// var router = express.Router();
//
// AWS.config.update({
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.REGION
// });
// console.log('cred is:', process.env.ACCESS_KEY_ID);
// const s3 = new AWS.S3();
//
// const uploadFiles = require('../s3/index');
//
// router.get('/', (req, res, next) => {
//   console.log('GET');
//   fs.readdir('./s3/sample-set', function(err, items) {
//     console.log('err:', err);
//     items.forEach(file => {
//       fs.readFile('./s3/sample-set/' + file, function(err, data) {
//         if (err) throw err; // Something went wrong!
//
//         var s3bucket = new AWS.S3({
//           params: {
//             Bucket: 'mike-hadlee-7000-files'
//           }
//         });
//         var folderName = file.replace(".pdf", "")
//         s3bucket.createBucket(function() {
//           var params = {
//             Key: folderName + '/' + file,
//             Body: data
//           };
//           s3bucket.upload(params, function(err, data) {
//             // Whether there is an error or not, delete the temp file
//             console.log('test:', data);
//             fs.unlink(file, function(err) {
//               if (err) {
//                 console.error(err);
//               }
//               console.log('Temp File Delete');
//             });
//
//             console.log("PRINT FILE:", file);
//             if (err) {
//               console.log('ERROR MSG: ', err);
//               // res.status(500).send(err);
//             } else {
//               console.log('Successfully uploaded data');
//               res.send('hello');
//             }
//           });
//         });
//       });
//     })
//   });
// });
//
// module.exports = router;

var fs = require('fs');
var AWS = require('aws-sdk');
require('dotenv').config()

var express = require('express');
var router = express.Router();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});
var s3 = new AWS.S3();
console.log('cred: ', process.env.ACCESS_KEY_ID)

router.get('/', function(req, res, next) {
  console.log('hadlee ')
});

fs.readdir('./sample-set', function(err, items) {
  items.forEach(file => {
    fs.readFile('./sample-set/' + file, function(err, data) {
      if (err) throw err; // Something went wrong!

      var s3bucket = new AWS.S3({
        params: {
          Bucket: 'mike-hadlee-7000-files'
        }
      });
      var folderName = file.replace(".pdf", "")
      s3bucket.createBucket(function() {
        var params = {
          Key: folderName + '/' + file,
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

module.export = router;
