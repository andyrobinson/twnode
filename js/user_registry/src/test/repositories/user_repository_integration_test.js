var vows = require('vows'),
assert = require('assert'),

suite = vows.describe('User Repository');

require('../../main/model/user.js');
require('../../main/repositories/user_repository.js');

var user_repository = new UserRepository();
user_repository.removeAll(function(error){
	if(error) { console.log(error) }
});


function saveAUser(name,email,id,callback){
	var user = new User();
	user.name = name;
	user.email = email;
	user.id = id;
	if (callback == null) { callback = function(errorMessage){ assert.equal(errorMessage,null); }};
	user_repository.saveOrUpdate(user, callback);
}

suite.addBatch({
	'find Users': {
		topic: function(){
			saveAUser('Bernardo', 'bernardo.rocha@thoughtworks.com', 123, this.callback);
		},
		'find all Users' : {
			topic: function(){
				user_repository.findAll(this.callback);
			},
			'then find all Users' :function(error, users){
				assert.equal(users[0].name, "Bernardo");
				assert.equal(users[0].email, "bernardo.rocha@thoughtworks.com");
				assert.equal(users[0].id, 123);				
			}
		},
		
		'find user by id' : {
			topic: function(){
				user_repository.findById(123, this.callback);
			},
			'then find all Users' :function(error, users){
				assert.equal(users.name, "Bernardo");
				assert.equal(users.email, "bernardo.rocha@thoughtworks.com");
				assert.equal(users.id, 123);
			}
		},
		
		'returns error if user not found' : {
			topic: function(){
				user_repository.findById(1234, this.callback);
			},
			'then find all Users' :function(error, users){
				assert.equal(error, "Could not find user with id: 1234");
				assert.isUndefined(users);
			}
		}
		
	}
	

}).export(module);