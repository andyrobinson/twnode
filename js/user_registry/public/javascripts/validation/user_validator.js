UserValidator = function(userToBeValidated){

	this.validators = [ new EmailValidator(userToBeValidated.email),
						new UsernameValidator(userToBeValidated.name)];
	this.errorMessages = [];
	
	this.isValid = function(){
		for (i=0;i<this.validators.length;i++){
			if(!this.validators[i].isValid()){ 
				this.errorMessages.push(this.validators[i].errorMessage); 
			}
		}
		
		return (this.errorMessages.length == 0);
	}
};
