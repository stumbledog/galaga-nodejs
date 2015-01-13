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
	var Enemy = mongoose.model('Enemy');

	new Star({
		_id:1,
		name:"Elnath",
		x:320,
		y:320,
		radius:6,
		_next:[2],
		waves:[
			{enemies:[{_enemy:1,count:4}]},
			{enemies:[{_enemy:1,count:8}]},
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:4}]},
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:8}]},
		]
	}).save();

	new Star({
		_id:2,
		name:"Decrux",
		x:280,
		y:380,
		radius:8,
		_next:[3],
		waves:[
			{enemies:[{_enemy:1,count:12},{_enemy:2,count:8}]},
			{enemies:[{_enemy:1,count:16},{_enemy:2,count:12}]},
			{enemies:[{_enemy:2,count:24}]},
			{enemies:[{_enemy:101,count:1}]},
		]
	}).save();

	new Star({
		_id:3,
		name:"Wezen",
		x:240,
		y:340,
		radius:4,
		_next:[4],
		waves:[
			{enemies:[{_enemy:1,count:12},{_enemy:2,count:8},{_enemy:3,count:2}]},
			{enemies:[{_enemy:1,count:16},{_enemy:2,count:12},{_enemy:3,count:4}]},
			{enemies:[{_enemy:1,count:30},{_enemy:3,count:8}]},
			{enemies:[{_enemy:101,count:2}]},
		]
	}).save();

	new Star({
		_id:4,
		name:"Rigel",
		x:190,
		y:200,
		radius:12,
		_next:[5],
		waves:[
			{enemies:[{_enemy:2,count:12},{_enemy:3,count:2}]},
			{enemies:[{_enemy:2,count:16},{_enemy:3,count:4},{_enemy:4,count:2}]},
			{enemies:[{_enemy:2,count:20},{_enemy:3,count:6},{_enemy:4,count:4}]},
			{enemies:[{_enemy:102,count:1}]},
		]
	}).save();

	new Star({
		_id:5,
		name:"Procyon",
		x:240,
		y:160,
		radius:7,
		_next:[6],
		waves:[
			{enemies:[{_enemy:2,count:12},{_enemy:3,count:2}]},
			{enemies:[{_enemy:2,count:16},{_enemy:3,count:4},{_enemy:4,count:2}]},
			{enemies:[{_enemy:2,count:20},{_enemy:3,count:6},{_enemy:4,count:4}]},
			{enemies:[{_enemy:102,count:1}]},
		]
	}).save();

	new Star({
		_id:6,
		name:"Avior",
		x:400,
		y:70,
		radius:7,
		_next:[6],
		waves:[
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:8},{_enemy:3,count:1}]},
			{enemies:[{_enemy:2,count:8},{_enemy:5,count:8},{_enemy:4,count:1}]},
			{enemies:[{_enemy:5,count:8},{_enemy:6,count:8},{_enemy:3,count:1},{_enemy:4,count:1}]},
			{enemies:[{_enemy:7,count:1}]},
		]
	}).save();

	new Star({
		_id:7,
		name:"Nair",
		x:460,
		y:130,
		radius:7,
		_next:[6],
		waves:[
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:8},{_enemy:3,count:1}]},
			{enemies:[{_enemy:2,count:8},{_enemy:5,count:8},{_enemy:4,count:1}]},
			{enemies:[{_enemy:5,count:8},{_enemy:6,count:8},{_enemy:3,count:1},{_enemy:4,count:1}]},
			{enemies:[{_enemy:7,count:1}]},
		]
	}).save();

	new Star({
		_id:8,
		name:"Mirzam",
		x:440,
		y:210,
		radius:7,
		_next:[6],
		waves:[
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:8},{_enemy:3,count:1}]},
			{enemies:[{_enemy:2,count:8},{_enemy:5,count:8},{_enemy:4,count:1}]},
			{enemies:[{_enemy:5,count:8},{_enemy:6,count:8},{_enemy:3,count:1},{_enemy:4,count:1}]},
			{enemies:[{_enemy:7,count:1}]},
		]
	}).save();

	new Star({
		_id:9,
		name:"Pavonis",
		x:520,
		y:160,
		radius:7,
		_next:[6],
		waves:[
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:8},{_enemy:3,count:1}]},
			{enemies:[{_enemy:2,count:8},{_enemy:5,count:8},{_enemy:4,count:1}]},
			{enemies:[{_enemy:5,count:8},{_enemy:6,count:8},{_enemy:3,count:1},{_enemy:4,count:1}]},
			{enemies:[{_enemy:7,count:1}]},
		]
	}).save();

	new Star({
		_id:10,
		name:"Librae",
		x:450,
		y:3200,
		radius:7,
		_next:[6],
		waves:[
			{enemies:[{_enemy:1,count:8},{_enemy:2,count:8},{_enemy:3,count:1}]},
			{enemies:[{_enemy:2,count:8},{_enemy:5,count:8},{_enemy:4,count:1}]},
			{enemies:[{_enemy:5,count:8},{_enemy:6,count:8},{_enemy:3,count:1},{_enemy:4,count:1}]},
			{enemies:[{_enemy:7,count:1}]},
		]
	}).save();

	new Enemy({
		_id:1,
		health:3,
		exp:1,
		gold:1,
		speed:2,
		range:300,
		width:64,
		height:55,
		radius:32,
		file:"ships",
		scale:0.6,
		firearm:{
			accuracy:100,
			damage:1,
			firerate:60,
			speed:3,
			radius:2,
			shots:1,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:182,crop_y:68,width:64,height:55},
		]
	}).save();

	new Enemy({
		_id:2,
		health:5,
		exp:2,
		gold:3,
		speed:2,
		range:500,
		width:74,
		height:69,
		radius:35,
		file:"ships",
		scale:0.5,
		firearm:{
			accuracy:60,
			damage:1,
			firerate:60,
			speed:3,
			radius:2,
			shots:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:3,crop_y:271,width:74,height:69},
		]
	}).save();

	new Enemy({
		_id:101,
		health:100,
		exp:50,
		gold:75,
		speed:1,
		range:400,
		width:56,
		height:56,
		radius:28,
		file:"ships",
		scale:1,
		firearm:{
			accuracy:70,
			damage:1,
			firerate:30,
			speed:4,
			radius:4,
			shots:3,
			shape:{
				crop_x:211,
				crop_y:204,
				width:28,
				height:8,
			}
		},
		components:[
			{crop_x:190,crop_y:10,width:56,height:56},
		]
	}).save();

	new Enemy({
		_id:102,
		health:200,
		exp:100,
		gold:150,
		speed:1.5,
		range:400,
		width:59,
		height:61,
		radius:30,
		file:"ships",
		scale:1,
		firearm:{
			accuracy:60,
			damage:2,
			firerate:10,
			speed:4,
			radius:4,
			shots:2,
			shape:{
				crop_x:211,
				crop_y:204,
				width:28,
				height:8,
			}
		},
		components:[
			{crop_x:10,crop_y:135,width:59,height:61},
		]
	}).save();

	new Enemy({
		_id:3,
		health:10,
		exp:4,
		gold:6,
		speed:2,
		range:400,
		width:73,
		height:53,
		radius:32,
		file:"ships",
		scale:0.6,
		firearm:{
			accuracy:60,
			damage:3,
			firerate:60,
			speed:4,
			radius:2,
			shots:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:247,crop_y:70,width:73,height:53},
		]	
	}).save();

	new Enemy({
		_id:4,
		health:20,
		exp:10,
		gold:15,
		speed:2,
		range:400,
		width:66,
		height:60,
		radius:33,
		file:"ships",
		scale:0.6,
		firearm:{
			accuracy:60,
			damage:4,
			firerate:40,
			speed:4,
			radius:2,
			shots:2,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:77,crop_y:200,width:66,height:60},
		]
	}).save();

	new Enemy({
		_id:103,
		health:400,
		exp:200,
		gold:350,
		speed:5,
		range:300,
		width:66,
		height:60,
		radius:30,
		file:"ships",
		scale:1.0,
		firearm:{
			accuracy:60,
			damage:3,
			firerate:40,
			speed:4,
			radius:5,
			shots:12,
			shape:{
				crop_x:39,
				crop_y:243,
				width:21,
				height:11
			}
		},
		components:[
			{crop_x:243,crop_y:274,width:64,height:65},
		]
	}).save();

	new Enemy({
		_id:5,
		health:30,
		exp:20,
		gold:35,
		speed:4,
		range:200,
		width:64,
		height:55,
		radius:30,
		file:"ships",
		scale:0.7,
		firearm:{
			accuracy:70,
			damage:8,
			firerate:50,
			speed:3,
			radius:2,
			shots:1,
			shape:{
				crop_x:124,
				crop_y:231,
				width:10,
				height:4
			}
		},
		components:[
			{crop_x:182,crop_y:68,width:64,height:55},
		]
	}).save();

	new Enemy({
		_id:6,
		health:50,
		exp:30,
		gold:40,
		speed:2,
		range:500,
		width:74,
		height:69,
		radius:35,
		file:"ships",
		scale:0.7,
		firearm:{
			accuracy:60,
			damage:2,
			firerate:40,
			speed:3,
			radius:2,
			shots:4,
			shape:{
				crop_x:211,
				crop_y:204,
				width:28,
				height:8,
			}
		},
		components:[
			{crop_x:3,crop_y:271,width:74,height:69},
		]
	}).save();

	new Enemy({
		_id:7,
		health:50,
		exp:30,
		gold:40,
		speed:2,
		range:500,
		width:74,
		height:69,
		radius:35,
		file:"ships",
		scale:0.7,
		firearm:{
			accuracy:60,
			damage:2,
			firerate:40,
			speed:3,
			radius:2,
			shots:4,
			shape:{
				crop_x:211,
				crop_y:204,
				width:28,
				height:8,
			}
		},
		components:[
			{crop_x:3,crop_y:271,width:74,height:69},
		]
	}).save();

	new Enemy({
		_id:8,
		health:80,
		exp:30,
		gold:45,
		speed:4,
		range:200,
		width:107,
		height:52,
		radius:40,
		file:"ships",
		scale:0.6,
		firearm:{
			accuracy:50,
			damage:2,
			firerate:20,
			speed:3,
			radius:5,
			shots:2,
			shape:{
				crop_x:39,
				crop_y:243,
				width:21,
				height:11
			}
		},
		components:[
			{crop_x:0,crop_y:372,width:107,height:52},
		]
	}).save();

	new Enemy({
		_id:104,
		health:600,
		exp:300,
		gold:450,
		speed:4,
		range:200,
		width:107,
		height:52,
		radius:40,
		file:"ships",
		scale:1.0,
		firearm:{
			accuracy:50,
			damage:7,
			firerate:20,
			speed:3,
			radius:5,
			shots:2,
			shape:{
				crop_x:39,
				crop_y:243,
				width:21,
				height:11
			}
		},
		components:[
			{crop_x:0,crop_y:372,width:107,height:52},
		]
	}).save();
});