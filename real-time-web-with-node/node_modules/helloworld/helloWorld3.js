'use strict';

var fs = require('fs'),
    ASQ = require('asynquence'),
    ASQR = require('asynquence-contrib');

var delayMsg = function(done, contents){
    setTimeout(function(){
        done(contents);
    }, 1000);
};

var readFile = function(filename){
    var sq = ASQ();

    fs.readFile(filename, sq.errfcb());
    return sq;
};

var say = function(filename, cb) {
    return readFile(filename)
    .then(delayMsg);
};
module.exports.say = say;
