var zombie = require("zombie"),
assert = require("assert"),
vows = require('vows'),
config = require('../../../config.js'),
app_root = "http://localhost:"+config.port;

suite = vows.describe('Users Page Test');

suite.addBatch({
	'Visit users page': {
		topic: function(){
			zombie.visit(app_root + "/users", this.callback);
		},
		'Should have a list of users' : function(err, browser, status){
			assert.equal(browser.text("title"), "User Registry System :: Listing All Users");
			assert.equal(status, 200);
			assert.isNull(err);			

			var link = browser.document.getElementById("new_user");
			assert.isNotNull(link);
		},
		'Then When Click on New User link' : {
			topic: function(browser){
				browser.clickLink("Create new User", this.callback);
			},
			'Should see New User Form Page' : function(err, browser, status){
				assert.equal(browser.text("title"), "User Registry System :: Create new User");
			},
			'Then When Fill In and Submit Form':{
				topic: function(browser){
					browser.fill("user[name]", "New User").
					  		fill("user[email]", "new@user.com").
					  		pressButton("Save", this.callback);
				},
				'Should see the new user on User List Page' : function(err, browser, status){
					assert.equal(browser.text("title"), "User Registry System :: Listing All Users");
					var element = browser.document.querySelector("td:contains('new@user.com')");
					assert.equal(element.innerHTML, "new@user.com");
				},
			}
		}
	}
}).export(module);