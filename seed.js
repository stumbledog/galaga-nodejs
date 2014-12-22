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
	var Firearm = mongoose.model('Firearm');
	var Ship = mongoose.model('Ship');
	var Star = mongoose.model('Star');
	var Enermy = mongoose.model('Enermy');
	var Wave = mongoose.model('Wave');

	var shape = new Shape({
		name: "Aries", 
		width: 14,
		height: 28,
		components: [{x:58,y:113,width:14,height:28}]
	});

	var ship = new Ship({
		name: "Aries",
		health: 10,
		speed: 3,		
	});

	var firearm = new Firearm({
		name:"gun",
		rarity: 1,
		cost: 1,
		damage: 1,
		firerate: 20,
		accuracy: 50,
		speed: 10,
		critical_rate:0.1,
		critical_damage:2,
		bonus:{
			damage:0,
			firerate:0,
			accuracy:0,
			critical_rate:0,
			critical_damage:0,
		}
	});

	shape.save(function(){
		firearm.save(function(){
			ship._shape = shape._id;
			ship._firearm.push(firearm._id);
			ship.save();
		});
	});

	var star1 = new Star({_id:1,name:"Elnath",x:320,y:320,radius:6,_next:[2], _wave:[1, 2, 3]});
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
		speed:.5,
		range:300,
		width:40,
		height:21,
		firearm:{
			damage:1,
			firerate:60,
			speed:3
		},
		components:[
			{x:-12,y:8,crop_x:171,crop_y:76,width:23,height:21},
			{x:+12,y:8,crop_x:208,crop_y:76,width:23,height:21},
			{crop_x:243,crop_y:113,width:12,height:24},
		]		
	});

	enermy.save();

	var wave1 = new Wave({_id:1,enermies:[{count:80,_enermy:1}]});
	var wave2 = new Wave({_id:2,enermies:[{count:16,_enermy:1}]});
	var wave3 = new Wave({_id:3,enermies:[{count:32,_enermy:1}]});
	wave1.save();
	wave2.save();
	wave3.save(function(){
		//process.exit();
	});

});