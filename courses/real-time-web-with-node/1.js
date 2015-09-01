'use strict';

var printHelp = function() {
    console.log('1.js by Roy Martin');
    console.log('');
    console.log('usage:');
    console.log('--help                Output the help for the file');
    console.log('--file={NAME}         read the file of {NAME} and output the value');
    console.log('');
};

var args = require('minimist')(process.argv.slice(2), {
        string: 'file'
    }),
    hello = require('./helloWorld.js');

if (args.help || !args.file) {
    printHelp();
    process.exit(1);
}

hello.say(args.file, function(err, contents) {
    if (err) {
        console.error('Errror: ' + err);
    } else {
        console.log(contents.toString());
    }

});
