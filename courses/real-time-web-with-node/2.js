'use strict';

var printHelp = function() {
    console.log('2.js by Roy Martin');
    console.log('');
    console.log('usage:');
    console.log('--help                Output the help for the file');
    console.log('--file={NAME}         read the file of {NAME} and output the value');
    console.log('');
};

var args = require('minimist')(process.argv.slice(2), {
        string: 'file'
    }),
    hello = require('./helloWorld2.js');

if (args.help || !args.file) {
    printHelp();
    process.exit(1);
}

hello.say(args.file)
.val(function(contents){
    console.log(contents.toString());
})
.or(function(err){
    console.error('Error: ' + err);
});
