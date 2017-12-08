var express = require('express');
var router = express.Router();

const uploadFiles = require('../s3/index');

router.get('/api/files', (req, res, next) => {  
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html');
});


module.exports = router;
