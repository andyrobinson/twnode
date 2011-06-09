var vows = require('vows'),
assert = require('assert'),
suite = vows.describe('Email Validator Unit Tests');

require('../../../public/javascripts/validation/email_validator.js')


suite.addBatch({
	'A Valid Email': function(){
			var emailValidator = new EmailValidator('bernardo.rocha@thoughtworks.com');
			assert.isTrue(emailValidator.isValid());
			assert.equal(emailValidator.errorMessage, "");
	},
	'An Invalid Email': function(){
			var emailValidator = new EmailValidator('invalid_email');
			assert.isFalse(emailValidator.isValid());
			assert.equal(emailValidator.errorMessage, "Invalid Email");			
	}
	
}).export(module);