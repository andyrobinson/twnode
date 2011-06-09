var vows = require('vows'),
assert = require('assert'),
suite = vows.describe('User Unit Tests');

require('../../../public/javascripts/validation/username_validator.js');
require('../../../public/javascripts/validation/email_validator.js');
require('../../main/model/user.js');


suite.addBatch({
	'Validation': {
		'a valid user': {
			topic: function(){ 
				var validUser = new User();
				validUser.email = 'bernardo.rocha@thoughtworks.com';
				validUser.name = 'bernardo';				
				return validUser;
			},

			'user should be valid': function(topic){
				assert.isTrue(topic.isValid()); 			
			}
		},
		'a user with invalid email': {
			topic: function(){ 
				var inValidUser = new User();
				inValidUser.email = 'aaabb';
				return inValidUser;
			},

			'user should be valid': function(topic){
				assert.isFalse(topic.isValid()); 			
			}
		}
	},
	'toJSON' :{
		'should return a JSON vertion of the user' : function(){
			var user = new User();
			user.id = 123;
			user.email = 'a@b.com';
			user.name = 'bernardo';
			assert.equal(JSON.stringify(user.toJSON()), JSON.stringify({ id: 123, email: 'a@b.com', name: 'bernardo'}));
		}
		
	}
}).export(module);