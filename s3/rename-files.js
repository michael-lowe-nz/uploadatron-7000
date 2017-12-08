var fs = require('fs');

fs.readdir('./sample-set', function(err, items) {
    for (var i=0; i < items.length; i++) {
      fs.renameSync('./sample-set/'+items[i], './sample-set/'+items[i]
          .replace(/\s/g, '-')
          .replace('---', '-')
          .replace('--', '-')
      );
    }
});
