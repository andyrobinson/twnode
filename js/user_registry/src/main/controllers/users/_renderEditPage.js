require('../../repositories/user_repository');

renderEditPage = function(user, req, res){
	res.render('users/edit', {
		title: 'Edit user '+user.id+' data',
		userData: user,
		error: user.errorMessages
	});
}

module.exports = renderEditPage;