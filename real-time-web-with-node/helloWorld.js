'use strict';

var fs = require('fs');
var say = function(filename, cb) {
    return fs.readFile(filename, function(error, contents) {
        if (error) {
            cb(error);
        } else {
            setTimeout(function() {
                cb(null, contents);
            }, 1000);
        }
    });
};
module.exports.say = say;
