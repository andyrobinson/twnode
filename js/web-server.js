http = require('http');
url = require('url');

webserver = {

	port: 8002,

    makeClientRequest: function() {
		var slowServer = http.createClient(8001, '127.0.0.1');
		var request = slowServer.request('GET', '/');
		request.end();
		return request;
    },

	getDataServerResponse: function(response) {

		request = webserver.makeClientRequest();
	
		request.on('response', function (serverResponse) {
			serverResponse.on('data', function (chunk) {
    			response.write(chunk);
			});
		
			serverResponse.on('end', function() {
		  		response.end('After data server response\n</body>\n</html>\n')		
			});
		});
	},

	waitFor: function(milliseconds) {
		var now = new Date();
		var end = now.getTime() + milliseconds;
		
		while(now.getTime() < end) {
		   for (i=0;i<1000;i++) {}
		   now =new Date();
		}
	   
	},
	
	responder: function (request, response) {

  		response.writeHead(200, {'Content-Type': 'text/html'});
  		response.write('<html>\n');
  		response.write('<body>\n<p>Start web request</p>\n');
        
        pathname = url.parse(request.url).pathname;
        
        if (pathname === '/node/data') {
  			response.write('Call to data service\n');
  			webserver.getDataServerResponse(response);
		} else if (pathname === '/node/busy') {
		  	response.write('Busy waiting ....\n');
		  	webserver.waitFor(1000);
  			response.end('Finished busy waiting\n</body>\n</html>\n');
		} else {
			response.end('unknown path\n</body>\n</html>\n');
		}
	}
}

http.createServer(webserver.responder).listen(webserver.port, "127.0.0.1");

console.log('Server client running at http://127.0.0.1:' + webserver.port + '/');
