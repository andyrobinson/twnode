require('../../repositories/user_repository');

module.exports = function(req, res){
	new UserRepository().delete(req.body.user.id, function(error){ 
		if(error){
			res.render('500.jade',{title: 'Error Deleting User', error_message: error});
		} else {
			res.redirect('/users');
		};
	})
};	