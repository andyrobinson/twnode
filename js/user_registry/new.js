var http = require('http');

http.createServer(function(request, response){
	response.write('HEllo');
	response.end('\n World');
}).listen(3000);