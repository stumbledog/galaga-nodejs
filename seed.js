var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/galaga');

var models_path = __dirname + '/models', model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
	require(models_path+'/'+file);
});

var StarModel = mongoose.model('Star');
var EnemyModel = mongoose.model('Enemy');


var connection = mongoose.connection;
connection.on("error", console.error.bind(console, 'connection error:'));
connection.once("open", function(){
	var db = connection.db;
	db.dropDatabase(function(){
		console.log("db drop");
		saveStars();
	});
});

function saveStars(){
	var waves = [
		[
			{enemies:[{_enemy:1,count:10}]},
			{enemies:[{_enemy:1,count:10},{_enemy:2,count:10}]},
			{enemies:[{_enemy:1,count:10},{_enemy:2,count:10},{_enemy:3,count:10}]},
			{enemies:[{_enemy:101,count:1}]},
		],
		[
			{enemies:[{_enemy:3,count:10}]},
			{enemies:[{_enemy:3,count:10},{_enemy:4,count:10}]},
			{enemies:[{_enemy:3,count:10},{_enemy:4,count:10},{_enemy:5,count:10}]},
			{enemies:[{_enemy:102,count:1}]},
		],
		[
			{enemies:[{_enemy:5,count:10}]},
			{enemies:[{_enemy:5,count:10},{_enemy:6,count:10}]},
			{enemies:[{_enemy:5,count:10},{_enemy:6,count:10},{_enemy:7,count:10}]},
			{enemies:[{_enemy:103,count:1}]},
		],
		[
			{enemies:[{_enemy:7,count:10}]},
			{enemies:[{_enemy:7,count:10},{_enemy:8,count:10}]},
			{enemies:[{_enemy:7,count:10},{_enemy:8,count:10},{_enemy:9,count:10}]},
			{enemies:[{_enemy:104,count:1}]},
		],
		[
			{enemies:[{_enemy:9,count:10}]},
			{enemies:[{_enemy:9,count:10},{_enemy:10,count:10}]},
			{enemies:[{_enemy:9,count:10},{_enemy:10,count:10},{_enemy:11,count:10}]},
			{enemies:[{_enemy:105,count:1}]},
		],
		[
			{enemies:[{_enemy:11,count:10}]},
			{enemies:[{_enemy:11,count:10},{_enemy:12,count:10}]},
			{enemies:[{_enemy:11,count:10},{_enemy:12,count:10},{_enemy:13,count:10}]},
			{enemies:[{_enemy:106,count:1}]},
		],
		[
			{enemies:[{_enemy:13,count:10}]},
			{enemies:[{_enemy:13,count:10},{_enemy:14,count:10}]},
			{enemies:[{_enemy:13,count:10},{_enemy:14,count:10},{_enemy:15,count:10}]},
			{enemies:[{_enemy:107,count:1}]},
		],
		[
			{enemies:[{_enemy:15,count:10}]},
			{enemies:[{_enemy:15,count:10},{_enemy:16,count:10}]},
			{enemies:[{_enemy:15,count:10},{_enemy:16,count:10},{_enemy:17,count:10}]},
			{enemies:[{_enemy:108,count:1}]},
		],
		[
			{enemies:[{_enemy:17,count:10}]},
			{enemies:[{_enemy:17,count:10},{_enemy:18,count:10}]},
			{enemies:[{_enemy:109,count:1}]},
		],
		[
			{enemies:[{_enemy:110,count:1}]},
		],
	];

	var stars = [];

	stars.push(initStar( 1,  "Elnath", 320, 320,  8,    2, waves[0]));
	stars.push(initStar( 2,  "Decrux", 566, 442,  9,    3, waves[1]));
	stars.push(initStar( 3,   "Wezen", 198, 291, 13,    4, waves[2]));
	stars.push(initStar( 4,   "Rigel", 255, 176, 12,    5, waves[3]));
	stars.push(initStar( 5, "Procyon",  84, 202, 13,    6, waves[4]));
	stars.push(initStar( 6,   "Avior",  32,  98,  8,    7, waves[5]));
	stars.push(initStar( 7,    "Nair", 504, 182, 15,    8, waves[6]));
	stars.push(initStar( 8,  "Mirzam", 203, 495,  7,    9, waves[7]));
	stars.push(initStar( 9, "Pavonis", 206, 371, 13,   10, waves[8]));
	stars.push(initStar(10,  "Librae", 412, 148, 12, null, waves[9]));

	var count = 0;
	stars.forEach(function(star){
		star.save(function(){
			count++;
			if(count == stars.length){
				console.log("Complete seed stars")
				saveEnemies();
			}
		});
	});
}

function saveEnemies(){
	var bullet_shapes = [
		{crop_x:124,crop_y:231,width:10,height: 4,file:"items"},
		{crop_x:122,crop_y:239,width: 6,height: 6,file:"items"},
		{crop_x:211,crop_y:204,width:28,height: 8,file:"items"},
		{crop_x: 39,crop_y:243,width:21,height:11,file:"items"},
	];

	var enemy_shapes = [
		{crop_x:190,crop_y: 14,width: 54,height: 44,file:"ships"},
		{crop_x:182,crop_y: 68,width: 64,height: 55,file:"ships"},
		{crop_x:247,crop_y: 70,width: 73,height: 54,file:"ships"},
		{crop_x: 10,crop_y:136,width: 58,height: 60,file:"ships"},
		{crop_x: 77,crop_y:200,width: 66,height: 60,file:"ships"},
		{crop_x:  3,crop_y:271,width: 73,height: 69,file:"ships"},
		{crop_x:243,crop_y:274,width: 64,height: 65,file:"ships"},
		{crop_x:  0,crop_y:372,width:107,height: 53,file:"ships"},
		{crop_x:238,crop_y:359,width: 77,height: 66,file:"ships"},
		{crop_x: 25,crop_y:443,width:129,height:101,file:"ships"},
	];

	var enemies = [];
	enemies.push(initEnemy(101,   100,  100,  100, 1, 300, 2.0, 60,  5, 20, 2,  4, enemy_shapes[0], bullet_shapes[0]));
	enemies.push(initEnemy(102,   200,  141,  141, 3, 100, 2.0, 80, 10, 10, 2,  2, enemy_shapes[1], bullet_shapes[0]));
	enemies.push(initEnemy(103,   400,  200,  200, 2, 200, 2.0, 70, 15, 30, 2,  6, enemy_shapes[2], bullet_shapes[0]));
	enemies.push(initEnemy(104,   800,  282,  282, 3, 200, 2.0, 70, 20, 20, 2,  4, enemy_shapes[3], bullet_shapes[1]));
	enemies.push(initEnemy(105,  1600,  400,  400, 4, 100, 2.0, 60, 25, 10, 2,  3, enemy_shapes[4], bullet_shapes[1]));
	enemies.push(initEnemy(106,  3200,  565,  565, 4, 200, 2.0, 60, 30, 40, 2,  8, enemy_shapes[5], bullet_shapes[1]));
	enemies.push(initEnemy(107,  6400,  800,  800, 2, 400, 2.0, 80, 35, 40, 2,  8, enemy_shapes[6], bullet_shapes[2]));
	enemies.push(initEnemy(108, 12800, 1131, 1131, 5, 100, 2.0, 60, 40, 30, 2,  6, enemy_shapes[7], bullet_shapes[2]));
	enemies.push(initEnemy(109, 25600, 1600, 1600, 3, 400, 2.0, 90, 45, 40, 2,  8, enemy_shapes[8], bullet_shapes[2]));
	enemies.push(initEnemy(110, 51200, 2262, 2262, 2, 300, 2.0, 60, 50, 30, 2, 12, enemy_shapes[9], bullet_shapes[3]));

	enemies.push(initEnemy(1,  5,  2,  2, 1, 300, 1.0, 60, 1, 80, 2, 2, enemy_shapes[0], bullet_shapes[0]));
	enemies.push(initEnemy(2, 10,  5,  5, 3, 100, 1.0, 80, 2, 40, 2, 1, enemy_shapes[1], bullet_shapes[0]));
	enemies.push(initEnemy(3, 15,  7,  7, 2, 200, 1.0, 70, 3, 90, 2, 3, enemy_shapes[2], bullet_shapes[0]));
	enemies.push(initEnemy(4, 20, 10, 10, 3, 200, 1.0, 70, 4, 80, 2, 2, enemy_shapes[3], bullet_shapes[1]));
	enemies.push(initEnemy(5, 25, 12, 12, 4, 100, 1.0, 60, 5, 60, 2, 1, enemy_shapes[4], bullet_shapes[1]));
	enemies.push(initEnemy(6, 30, 15, 15, 4, 200, 1.0, 60, 6, 80, 2, 4, enemy_shapes[5], bullet_shapes[1]));
	enemies.push(initEnemy(7, 35, 17, 17, 2, 400, 1.0, 80, 7, 80, 2, 4, enemy_shapes[6], bullet_shapes[2]));
	enemies.push(initEnemy(8, 40, 20, 20, 5, 100, 1.0, 60, 8, 60, 2, 3, enemy_shapes[7], bullet_shapes[2]));
	enemies.push(initEnemy(9, 45, 22, 22, 3, 400, 1.0, 90, 9, 80, 2, 4, enemy_shapes[8], bullet_shapes[2]));

	enemies.push(initEnemy(10, 50, 25, 25, 1, 300, 1.0, 60, 10, 80, 2, 2, enemy_shapes[0], bullet_shapes[0]));
	enemies.push(initEnemy(11, 55, 27, 27, 3, 100, 1.0, 80, 11, 40, 2, 1, enemy_shapes[1], bullet_shapes[0]));
	enemies.push(initEnemy(12, 60, 30, 30, 2, 200, 1.0, 70, 12, 90, 2, 3, enemy_shapes[2], bullet_shapes[0]));
	enemies.push(initEnemy(13, 65, 32, 32, 3, 200, 1.0, 70, 13, 80, 2, 2, enemy_shapes[3], bullet_shapes[1]));
	enemies.push(initEnemy(14, 70, 35, 35, 4, 100, 1.0, 60, 14, 60, 2, 1, enemy_shapes[4], bullet_shapes[1]));
	enemies.push(initEnemy(15, 75, 37, 37, 4, 200, 1.0, 60, 15, 80, 2, 4, enemy_shapes[5], bullet_shapes[1]));
	enemies.push(initEnemy(16, 80, 40, 40, 2, 400, 1.0, 80, 16, 80, 2, 4, enemy_shapes[6], bullet_shapes[2]));
	enemies.push(initEnemy(17, 85, 42, 42, 5, 100, 1.0, 60, 17, 60, 2, 3, enemy_shapes[7], bullet_shapes[2]));
	enemies.push(initEnemy(18, 90, 45, 45, 3, 400, 1.0, 90, 18, 80, 2, 4, enemy_shapes[8], bullet_shapes[2]));

	var count = 0;
	enemies.forEach(function(enemy){
		enemy.save(function(){
			count++;
			if(count == enemies.length){
				console.log("Complete seed Enemies")
				process.exit(0);
			}
		});
	});
}

function initStar(id, name, x, y, radius, next, waves){
	var star = new StarModel({
		_id:id,
		name:name,
		x:x,
		y:y,
		radius:radius,
		next:next,
		waves:waves
	});
	return star;
}


function initEnemy(id, health, exp, gold, speed, range, scale, accuracy, damage, firerate, bullet_speed, shots, shape, bullet_shape){
	var enemy = new EnemyModel({
		_id:id,
		health:health,
		exp:exp,
		gold:gold,
		speed:speed,
		range:range,
		scale:scale,
		firearm:{
			accuracy:accuracy,
			damage:damage,
			firerate:firerate,
			speed:bullet_speed,
			shots:shots,
			shape:bullet_shape,
		},
		shape:shape,
	});
	return enemy;
}