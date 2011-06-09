require('./_renderEditPage');

module.exports = function(req, res){
	new UserRepository().findById(req.params.id, function(error, user){ 
		if(error){
			res.render('500.jade',{title: 'User Registry Error', error_message: error});
		} else {
			renderEditPage(user, req,res);
		};
	});
};