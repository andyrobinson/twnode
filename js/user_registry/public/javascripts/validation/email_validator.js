EmailValidator = function(emailToBeValidated){
	this.email = emailToBeValidated;
	this.errorMessage = "";
	
	this.isValid = function(){
		var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
		if(this.email.match(re) == null){
			this.errorMessage = 'Invalid Email';
			return false
		};
		return true;
	}
};