var fs = require('fs');

fs.readdir('./sample-set', function(err, items) {
    // items.forEach(item => {
    //   console.log('rename:', item, 'to:', './sample-set/'+item.replace(/\s/g, ''))
    //   fs.renameSync('./sample-set/'+item, './sample-set/'+item.replace(/\s/g, ''))
    // })

    for (var i=0; i < items.length; i++) {
      fs.renameSync('./sample-set/'+items[i], './sample-set/'+items[i].replace(/\s/g, '-'))
    }
});
