var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
	name: String,
	cookie_ID: String
});

UsersSchema.methods.greet = function(){
	var greeting = this.name ? "I'm " + this.name : "unknown";
	console.log(greeting);
}
var Users = mongoose.model('Users', UsersSchema);


/*

var user = new Users({name:"julkis"});

user.save(function(err, user){
	if(err) return console.error(err);
	//user.greet();
	Users.find(function(err, users){
		console.log(users);
	});
});
*/
/*
Users.find(function(err, users){
	console.log(users);
});
Users.find({name:"julkis"}, function(err, user){
	console.log(user);
});
*/
