require('../../model/user');

module.exports = function(req, res){
	res.render('users/new', { title: 'Create new User', userData: new User()});
};


