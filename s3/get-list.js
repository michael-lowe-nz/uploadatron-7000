var fs = require('fs');
var AWS = require('aws-sdk');
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});
var s3 = new AWS.S3();

var params = {
 Bucket: 'mike-hadlee-7000-files',
 Delimiter: '/',
 Prefix: ''
};
s3.listObjects(params, function (err, data) {
     if(err)throw err;
    fs.truncate('./files.csv', 0, function(){console.log('done')});
    fs.appendFile("./files.csv", 'Title, Link', function(err) {});
     data.CommonPrefixes.forEach(item => {
         fs.appendFile("./files.csv", '\r\n' +  item.Prefix.slice(0, -1) + '.pdf , https://s3-ap-southeast-2.amazonaws.com/mike-hadlee-7000-files/'+ item.Prefix +item.Prefix.slice(0, -1) + '.pdf , ', function(err) {});
     })
});