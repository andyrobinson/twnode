var vows   = require('vows'),
zombie 	   = require("zombie"),
assert     = require("assert"),
config     = require('../../../config.js'),
app_root   = "http://localhost:"+config.port;

vows.describe('Home Page Test').addBatch({
	'Visit main page': {
		topic: function(){
			zombie.visit(app_root, this.callback);
		},
		'Should have nice Page Title' : function(err, browser, status){								
			assert.equal(browser.text("title"), "User Registry System :: Index");
			assert.equal(status, 200);
			assert.isNull(err);			
		},
		'Then When Click on User List link' : {
			topic: function(browser){
				browser.clickLink("Click Here to see the list of users", this.callback);
			},
			'Should see User List Page' : function(err, browser, status){
				assert.equal(browser.text("title"), "User Registry System :: Listing All Users");
			}
		}
	}
}).export(module);