require('./link_generator.js');
require('../../../public/javascripts/validation/email_validator.js');
require('../../../public/javascripts/validation/username_validator.js');
require('../../../public/javascripts/validation/user_validator.js');

User = function(){
	this._id;
	this.id = LinkGenerator.generate_link();
	this.name = "";
	this.email = "";
	this.errorMessages = "";
	this.isValid = function(){
		var validator = new UserValidator(this.toJSON());
		if(!validator.isValid()){
			this.errorMessages = validator.errorMessages.join(",");
		}
		return this.errorMessages == "";
	}
	
	this.toJSON = function(){
		return {'id':this.id, 'email': this.email, 'name': this.name};
	}
};




