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
	var Ship = mongoose.model('Ship');
	var Star = mongoose.model('Star');
	var Enermy = mongoose.model('Enermy');
	var Wave = mongoose.model('Wave');

	var star1 = new Star({_id:1,name:"Elnath",x:320,y:320,radius:6,_next:[2], _wave:[1,2,3,4]});
	var star2 = new Star({_id:2,name:"Decrux",x:280,y:380,radius:8,_next:[3], _wave:[5,6,7,8]});
	var star3 = new Star({_id:3,name:"Wezen",x:240,y:340,radius:7});

	star1.save();
	star2.save();
	star3.save();

	var enermy1 = new Enermy({
		_id:1,
		name:"MK",
		health:3,
		exp:1,
		gold:1,
		speed:2,
		range:300,
		width:40,
		height:40,
		radius:20,
		file:"components",
		firearm:{
			accuracy:70,
			damage:1,
			firerate:60,
			speed:3,
			radius:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{x:-12,y:8,crop_x:171,crop_y:76,width:23,height:21},
			{x:+12,y:8,crop_x:208,crop_y:76,width:23,height:21},
			{crop_x:243,crop_y:113,width:12,height:24},
		]
	});

	var enermy2 = new Enermy({
		_id:2,
		name:"MK-II",
		health:5,
		exp:2,
		gold:2,
		speed:2,
		range:500,
		width:30,
		height:30,
		radius:30,
		file:"components",
		firearm:{
			accuracy:90,
			damage:1,
			firerate:60,
			speed:6,
			radius:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:240,crop_y:112,width:14,height:24},
			{x:-7,y:18,crop_x:175,crop_y:45,width:18,height:26},
			{x:7,y:18,crop_x:195,crop_y:45,width:18,height:26},
		]
	});

	var enermy3 = new Enermy({
		_id:3,
		name:"MK-II",
		health:100,
		exp:10,
		gold:20,
		speed:1,
		range:400,
		width:48,
		height:48,
		radius:32,
		file:"ships",
		firearm:{
			accuracy:80,
			damage:3,
			firerate:20,
			speed:4,
			radius:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:190,crop_y:10,width:56,height:56},
		]
	});

	var enermy4 = new Enermy({
		_id:4,
		name:"MK-II",
		health:200,
		exp:20,
		gold:40,
		speed:1.5,
		range:400,
		width:64,
		height:64,
		radius:64,
		file:"ships",
		firearm:{
			accuracy:60,
			damage:5,
			firerate:10,
			speed:3,
			radius:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:10,crop_y:135,width:59,height:61},
		]
	});

	enermy1.save();
	enermy2.save();
	enermy3.save();
	enermy4.save();

	var wave1 = new Wave({_id:1,enermies:[{count:8,_enermy:1}]});
	var wave2 = new Wave({_id:2,enermies:[{count:8,_enermy:2}]});
	var wave3 = new Wave({_id:3,enermies:[{count:8,_enermy:1},{count:8,_enermy:2}]});
	var wave4 = new Wave({_id:4,enermies:[{count:1,_enermy:3}]});

	var wave5 = new Wave({_id:5,enermies:[{count:10,_enermy:1}]});
	var wave6 = new Wave({_id:6,enermies:[{count:10,_enermy:2}]});
	var wave7 = new Wave({_id:7,enermies:[{count:10,_enermy:1},{count:10,_enermy:2}]});
	var wave8 = new Wave({_id:8,enermies:[{count:1,_enermy:4}]});
	

	wave1.save();
	wave2.save();
	wave3.save();
	wave4.save();
	wave5.save();
	wave6.save();
	wave7.save();
	wave8.save();
});