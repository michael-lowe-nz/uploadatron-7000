var fs = require('fs');
var AWS = require('aws-sdk');
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
}

s3.listObjects(params, function (err, data) {
     if(err)throw err;
     data.Contents.forEach(item => {
         console.log(item.Key);
         fs.appendFile("./files.csv", item.Key + ', ', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
     })
});
