
var vows = require('vows');
var assert = require('assert');
    
vows.describe('Array').addBatch({       
    'A monkey': {                                      
        'with ears': {               
            topic: function() {
            	var monkey = {
            		ears: ["left","right"]
            	};
            	return monkey;
            },                          

            'has three ears': function (topic) {
                assert.equal(topic.ears.length, 2);
            },
            
            'has a left ear' : function (topic) {
               assert.include(topic.ears,"left");
            }
        }
        // with a comma insert more sub contexts here
    }
}).run()