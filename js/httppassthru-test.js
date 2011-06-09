var vows   = require('vows'),
assert     = require("assert"),
passthru = require('./httppassthru.js');

var stubFinalResponse = {
	id:0,
	data: '',
	write: function(chunk) {
		this.data = this.data + chunk + '\n';
	},
	end: function(chunk) {
		this.write(chunk);
	},
	getWrittenData: function() {
		return this.data;
	},
};

var stubResponse = {
	callbacks: {},
	on: function(event,callback){
		this.callbacks[event]=callback;
	},
	triggerOn: function(event, data) {
		this.callbacks[event](data);
	}
};

var stubRequest = {
	callbacks: {},
	on: function(event,callback){
		this.callbacks[event]=callback;
	},
	triggerOnWithError: function(event, data) {
		this.callbacks[event](null,data);
	},
	triggerOn: function(event, data) {
		this.callbacks[event](data);
	},
	end: function(){}
};

var stubClientConnection = {
	request: function(httpVerb,path) {
		return stubRequest;
	}
}

var dummyResponse = {id:1};

var httpPassThru = new HttpPassThru(stubFinalResponse, stubClientConnection);

vows.describe('Http pass through client test').addBatch({
	'http client': {
		'writeResponse' : {
			topic: function() {
				httpPassThru.writeResponse(stubResponse, this.callback);
				stubResponse.triggerOn('data','chunk1');
				stubResponse.triggerOn('data','chunk2');
				stubResponse.triggerOn('end');
			},
			'Should write chunks from client response to response' : function (err, response) {
				assert.include(response.getWrittenData(),'chunk1\nchunk2\n');
			}		
		},
		'createRequest' : {
			topic: function() {
				httpPassThru.createRequest(this.callback);
				stubRequest.triggerOnWithError('response', dummyResponse);
			},
			'Should call back on response event' : function(err, response) {
				assert.equal(response, dummyResponse);
			}
		},
		'passThru' : {
			topic: function() {
				httpPassThru.passThru('message');
				stubRequest.triggerOn('response', stubResponse);
				stubResponse.triggerOn('end');
				return null;
			},
			'Should write final response message' : function(topic) {
				assert.include(stubFinalResponse.getWrittenData(),'message');
			}
		}
	}
}).export(module);
