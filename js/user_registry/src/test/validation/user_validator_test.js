var vows = require('vows'),
assert = require('assert'),
suite = vows.describe('User Validator Unit Tests');

require('../../../public/javascripts/validation/username_validator.js');
require('../../../public/javascripts/validation/email_validator.js');
require('../../../public/javascripts/validation/user_validator.js');

suite.addBatch({
	'A Valid User': function(){
		var userValidator = new UserValidator({ 'name': 'Bernardo', 'email':'bernardo.rocha'});
		assert.isTrue(userValidator.isValid());
	},
	'A User with an invalid Email': function(){
		var userValidator = new UserValidator({ 'name': 'Bernardo', 'email':'aaa'});
		assert.isFalse(userValidator.isValid());
		assert.include(userValidator.errorMessages, "Invalid Email");
	},
	'A User with an invalid Name': function(){
		var userValidator = new UserValidator({ 'name': 'aa', 'email':'bernardo.rocha@thoughtworks.com'});
		assert.isFalse(userValidator.isValid());
		assert.include(userValidator.errorMessages, "Invalid Name");
	},
	'A User with both and email invalids': function(){
		var userValidator = new UserValidator({ 'name': 'aa', 'email':'bb'});
		assert.isFalse(userValidator.isValid());
		assert.include(userValidator.errorMessages, "Invalid Name");
		assert.include(userValidator.errorMessages, "Invalid Email");		
	}
	
}).export(module);