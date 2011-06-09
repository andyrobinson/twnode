$(document).ready(function() {
	var form = $('#user_form');
	
	form.submit(function(){
		var validator = new UserValidator({'name': $('input[name="user[name]"]').val(), 'email': $('input[name="user[email]"]').val()});
		
		if(!validator.isValid()){
			alert('Error: ' + validator.errorMessages.join(","));
			return false;
		}
	});
});