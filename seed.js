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
	var Star = mongoose.model('Star');
	var Enermy = mongoose.model('Enermy');
	var Wave = mongoose.model('Wave');


	var shape = new Shape({
		"name": "Aries", 
		"components": [{x:58,y:113,width:14,height:28}]
	});

	shape.save();

	var star1 = new Star({_id:1,name:"Elnath",x:320,y:320,radius:6,_next:[2], _wave:[1]});
	var star2 = new Star({_id:2,name:"Decrux",x:280,y:380,radius:8,_next:[3]});
	var star3 = new Star({_id:3,name:"Wezen",x:240,y:340,radius:7});

	star1.save();
	star2.save();
	star3.save();

	var enermy = new Enermy({
		_id:1,
		name:"MK",
		health:5,
		exp:1,
		gold:1,
		speed:5,
		range:200,
		components:[
			{x:243,y:113,width:12,height:24},
			{x:171,y:76,width:23,height:21},
			{x:208,y:76,width:23,height:21},
		]		
	});

	enermy.save();

	var wave = new Wave({_id:1,enermies:[{count:10,_enermy:1}]});
	wave.save(function(){
		Wave.find({}).populate('enermies._enermy').exec(function(err, waves){
			console.log(waves);
		})
	});

});