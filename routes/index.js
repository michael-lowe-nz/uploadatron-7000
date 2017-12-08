var express = require('express');
var router = express.Router();

router.get('/api/files', (req, res, next) => {
  console.log('express --- getting files')
  res.json({
    files: [
      {
        name: 'michaelPDF.pdf',
        success: true
      }
    ]
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html');
});


module.exports = router;
