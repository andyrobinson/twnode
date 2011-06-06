var http = require('http');
var port = 8001;

http.createServer(function (request, response) {

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('ACME Data Server - your data\n');

  setTimeout(function() {
	  response.end('... only slower\n')
  }, 1000);

}).listen(port, "127.0.0.1");

console.log('ACME slow data server running at http://127.0.0.1:' + port + '/');

