var http = require('http');
var port = 8002;

var getDataServerResponse = function(response) {

	var slowServer = http.createClient(8001, '127.0.0.1');
	var request = slowServer.request('GET', '/');
	request.end();
	
	request.on('response', function (serverResponse) {
		serverResponse.on('data', function (chunk) {
    		response.write(chunk);
		});
		
		serverResponse.on('end', function() {
		  response.end('After data server response\n')

		});
	});


}

http.createServer(function (request, response) {

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Start web request\n');
  response.write('Call to data service\n');

  getDataServerResponse(response);
  
}).listen(port, "127.0.0.1");

console.log('Server client running at http://127.0.0.1:' + port + '/');
