'use strict';
var ASQ = require('asynquence'),
	ASQR = require('asynquence-contrib'),
	node_static = require('node-static'),
	static_files = new node_static.Server(__dirname);

var handleHTTP = function(req, res) {
	if (req.method === 'GET') {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener('end', function() {
				req.url = req.url.replace(/^\/(\d+).*$/, '/$1.html');
				static_files.serve(req, res);
			});
			req.resume();
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