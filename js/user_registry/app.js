/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();
var config = require('./config.js');


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});



// Routes
var controllers_path = './src/main/controllers';

app.get('/', 			   require(controllers_path+'/index'));
app.get('/users', 	  	   require(controllers_path+'/users/index'));
app.get('/users/new', 	   require(controllers_path+'/users/new'));
app.get('/users/:id', 	   require(controllers_path+'/users/show'));
app.get('/users/:id/edit', require(controllers_path+'/users/edit'));
app.post('/users/delete',  require(controllers_path+'/users/delete'));
app.post('/users', 		   require(controllers_path+'/users/save'));


app.listen(config.port);
console.log("Express server listening on port %d", app.address().port);