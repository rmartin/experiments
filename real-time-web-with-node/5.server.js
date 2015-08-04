'use strict';
var ASQ = require('asynquence'),
	ASQR = require('asynquence-contrib');

var handleHTTP = function(req, res) {
	if (req.method === 'GET') {
		if (req.url === '/') {
			res.writeHead(200, {
				'Content-type': 'text/plain'
			});

			ASQ(function(done) {
					setTimeout(function() {
						done(Math.random());
					});
				})
				.then(function(done, msg) {
					setTimeout(function() {
						done('Hello World: ' + msg);
					});
				})
				.val(function(msg) {
					res.end(msg);
				});

		} else {
			res.writeHead(403);
			res.end('Get outta here!');
		}
	} else {
		res.writeHead(403);
		res.end('Get outta here!');
	}

};

var http = require('http'),
	host = 'localhost',
	port = 8006,
	http_serv = http.createServer(handleHTTP).listen(port, host);