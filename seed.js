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
	
	var Shape = mongoose.model('Shape');
	var Map = mongoose.model('Map');

	var shape = new Shape({
		"name": "Aries", 
		"components": [{x:58,y:113,width:14,height:28}]
	});
	shape.save();

	var map1 = new Map({_id:1,name:"star1",x:100,y:100});
	map1.save();

	var map2 = new Map({_id:2,name:"star2",x:200,y:200, _next:[1]});
	map2.save(function(){
		Map.find().populate("_next").exec(function(err, maps){console.log(maps)});
	});



});