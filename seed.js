var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/galaga');

var connection = mongoose.connection;
connection.on("error", console.error.bind(console, 'connection error:'));
connection.once("open", function(){
	var db = connection.db;
	db.dropDatabase();

	var models_path = __dirname + '/models', model_files = fs.readdirSync(models_path);
	model_files.forEach(function (file) {
		require(models_path+'/'+file);
	});
	
	var User = mongoose.model('User');
	var Shape = mongoose.model('Shape');
	var Ship = mongoose.model('Ship');

	var user = new User({});
	var shape = new Shape({name:"Aries", components:[{x:58,y:113,width:14,height:28}]});

	user.save(function(){
		shape.save(function(){
			var ship = new Ship({"user":user._id,"shape":shape._id});
			ship.save();
		});
	});
});