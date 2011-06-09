function isString(elem){
	var alphaExp = /^[\sa-zA-Z]+$/;
	if(elem !== undefined && elem !== null && elem.match(alphaExp)){
		return true;
	}else{
		return false;
	}
}

UsernameValidator = function(nameToBeValidated){
	this.username = nameToBeValidated;
	this.errorMessage = "";
	
	this.isValid = function(){
		if (isString(this.username)  && this.username.length > 3){
			return true
		};
		this.errorMessage = "Invalid Name";
		return false;
	}
};
