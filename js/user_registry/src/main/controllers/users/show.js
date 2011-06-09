require('../../repositories/user_repository');

module.exports = function(req, res){
  	new UserRepository().findById(req.params.id, function(error, user){ 
		if(error){
			res.render('500.jade',{title: 'Express', error_message: error});
		} else {
			res.render('users/show', {
    			title: 'Display user '+user.id,
				userData: user
  			});
		};
	});
};