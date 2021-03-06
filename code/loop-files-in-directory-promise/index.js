const fs = require('mz/fs');
let args = process.argv.slice(2),
    dirPath = args[0],
    filter = args[1];

// call with npm start -- pathName filter
fs.readdir(dirPath).then(listing => {
    for (item in listing) {
        if (listing[item].includes(filter)) {
            console.log('http://intelsrt.s3.amazonaws.com/phase-4/' + listing[item])
        }
    }
}).catch(err => {
    console.error(err)
});
