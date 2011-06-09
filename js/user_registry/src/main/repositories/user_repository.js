require('../model/user.js');

var config = require('../../../config.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema , ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name:   { type: String }, 
	email: { type: String },
	id: { type: Number}
}); 

mongoose.model("User", UserSchema); 
var db =  mongoose.connect(config.mongoDbLocation+"/user");
var UserModel = db.model("User");

UserRepository = function(){
	
	this.findAll = function(callback) {
		UserModel.find({},function(err, users){
			if (err != null) {  console(err); }
			var result=[ ];
			for (i=0;i<users.length;i++){	
				var user = new User();
				user.name = users[i].name;
				user.email = users[i].email;
				user.id = users[i].id;
				user._id = users[i]._id;
				result.push(user);
			}

			callback(err, result);	
		});

	};
	
	this.findById = function(id,callback) {
		UserModel.findOne({'id':id},function(err, users){
			if (err != null) {  console.log(err); }
			var user;
			if (users){
				user = new User();
				user.name = users.name;
				user.email = users.email;
				user.id = users.id;
				user._id = users._id;
			} else {
				err = "Could not find user with id: " + id;
			}

			callback(err, user);
		});
	};

	this.delete = function(IdFromUser, callback) {
		var error;	
		UserModel.findOne({'id':IdFromUser}, function(err, user) {
		        if (err) { console.log(err); error=err; }
		      	user.remove();
		});
		callback(error);
	};

	this.removeAll = function(callback) {
		UserModel.remove({}, function (err) {
			callback(err);
		});
	};


	this.saveOrUpdate = function(user, callback){
		var saveUser = function(err, users){
			if(users){
				user._id = users._id;
				new UserRepository().update(user, callback);
			} else{
				new UserRepository().saveNew(user,callback);				
			}
			
		}
		
		this.findById(user.id, saveUser);
	}
	

	this.update = function(user,callback){
		var afterSave = function(error){
			if(error != null){
				error = "Save Error: " + error;
				console.log(error);
			} 
			callback(error);
		};
		
		UserModel.update({'_id': user._id} , user.toJSON(), afterSave);
	}

	this.saveNew = function(user, callback) {
		var userModel = new UserModel();
		userModel.name = user.name;
		userModel.email = user.email;
		userModel.id = user.id;
				
		var afterSave = function(error){
			if(error != null){
				error = "Save Error: " + error;
				console.log(error);
			} 
			callback(error);
		};
	
		userModel.save(afterSave);
	};
};
