var vows = require('vows'),
assert = require('assert'),
suite = vows.describe('Username Validator Unit Tests');

require('../../../public/javascripts/validation/username_validator.js')


suite.addBatch({
	'A Valid Name': function(){
		var usernameValidator = new UsernameValidator('Bernardo');
		assert.isTrue(usernameValidator.isValid());
		assert.equal(usernameValidator.errorMessage, "");		
	},
	'A Name with spaces should be valid': function(){
		var usernameValidator = new UsernameValidator('Bernardo Rocha');
		assert.isTrue(usernameValidator.isValid());
		assert.equal(usernameValidator.errorMessage, "");		
	},	
	'An Name Too Small should be Invalid': function(){
		var usernameValidator = new UsernameValidator('a');
		assert.isFalse(usernameValidator.isValid());
		assert.equal(usernameValidator.errorMessage, "Invalid Name");
	},
	'A Blank Name should be Invalid': function(){
		var usernameValidator = new UsernameValidator('');
		assert.isFalse(usernameValidator.isValid());
		assert.equal(usernameValidator.errorMessage, "Invalid Name");		
	},
	'An Undefined Name should be Invalid': function(){
		var usernameValidator = new UsernameValidator();
		assert.isFalse(usernameValidator.isValid());
		assert.equal(usernameValidator.errorMessage, "Invalid Name");		
	},
	'A Null Name should be Invalid': function(){
		var usernameValidator = new UsernameValidator(null);
		assert.isFalse(usernameValidator.isValid());
		assert.equal(usernameValidator.errorMessage, "Invalid Name");		
	}
	
}).export(module);