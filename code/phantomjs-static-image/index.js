'use strict';
var webshot = require('webshot'),
    express = require('express'),
    app = express(),
    options = {};

app.get('/', function(req, res) {
    var renderStream = webshot('http://localhost:3333/', null, options),
        screenshot = '';

    // Capture the streaming output from the screenshot
    renderStream.on('data', function(data) {
        screenshot += data.toString('binary');
    });

    // Once the image capture is completed, write it out to the browser
    renderStream.on('end', function() {
        res.set('Content-Type', 'image/png');
        res.end(screenshot, 'binary');
    });
});

app.listen(3000);
