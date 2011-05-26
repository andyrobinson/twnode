var vows = require("vows");
var assert = require("assert");
var fs = require("fs");

vows.describe('Array').addBatch({       
	'a file': { 
		topic: function () {
			fs.stat('/Users/arobinson/FILE', this.callback);
		},
		'can be accessed': function (err, stat) {
			assert.isNull   (err);        // We have no error
			assert.isObject (stat);       // We have a stat object
		},
		'is not empty': function (err, stat) {
			assert.equal (stat.size,99); // The file size is > 0
		}
	}	
}).run();

