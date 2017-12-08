var express = require('express');
var router = express.Router();

router.get('/api/files', (req, res, next) => {
  res.json({
    files: 'Success'
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html');
});


module.exports = router;
