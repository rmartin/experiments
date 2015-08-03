'use strict';

var handleHTTP = function(req, res) {
	if (req.method === 'GET') {
		if (req.url === '/') {
			res.writeHead(200, {
				'Content-type': 'text/plain'
			});
			res.end('Hello World: ' + Math.random());
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