require('../../repositories/user_repository');

renderAllUsers = function(req, res, success_message){
	new UserRepository().findAll(function(error, userData){ 
		if(error){
			res.render('500.jade',{title: 'Express', error_message: error});
		} else {
  			res.render('users/index', {
    			title: 'Listing All Users',
				users: userData,
				success_message : success_message
  			});
		};
	});
}