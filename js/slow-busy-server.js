var http = require('http');
var port = 8002;

http.createServer(function (request, response) {

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Start web request\n');
  response.write('Busy waiting ....\n');

  waitFor(1000);
  
  response.end('Finished');
  
}).listen(port, "127.0.0.1");

var waitFor = function(milliseconds) {
    var now = new Date();
    var end = now.getTime() + milliseconds;
    
    while(now.getTime() < end) {
       for (i=0;i<1000;i++) {}
       now =new Date();
    }
   
}
console.log('Server client running at http://127.0.0.1:' + port + '/');
