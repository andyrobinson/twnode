HttpPassThru = function(responseToWriteTo, clientConnection) {
	
	that = this;
	that.response = responseToWriteTo;
	that.connection = clientConnection;
	
	this.createRequest =  function(onResponseCallback) {
		var request = this.connection.request('GET', '/');
		request.end();
		request.on('response', onResponseCallback);
    };
    
	this.writeResponse = function(clientResponse, onResponseEndCallback) {
	
		clientResponse.on('data', function (chunk) {
			that.response.write(chunk);
		});
	
		clientResponse.on('end', function() {
			onResponseEndCallback(null, that.response);
		});

	};

	this.passThru = function(finalMessage) {	
		that.createRequest(function(clientResponse){
			that.writeResponse(clientResponse,function(err,finalResponse){
				finalResponse.end(finalMessage);
			});
		});
	}
	
};