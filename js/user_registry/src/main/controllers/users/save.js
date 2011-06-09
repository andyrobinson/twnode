require('../../model/user');
require('../../repositories/user_repository');
require('./_renderEditPage');

module.exports = function(req, res){
	var user = new User();
	user.id = req.body.user.id;
	user.name = req.body.user.name;
	user.email = req.body.user.email;
	if(user.isValid()){
		new UserRepository().saveOrUpdate(user, function(error){
			var success_message = "User '"+user.name+"' saved with success";
			renderAllUsers(req,res, success_message);			
		})
	}else{
		renderEditPage(user,req,res);
	}
};		