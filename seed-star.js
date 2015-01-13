var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/galaga');

var models_path = __dirname + '/models';
require(models_path+'/StarModel.js');

var Star = mongoose.model('Star');

var connection = mongoose.connection;
connection.on("error", console.error.bind(console, 'connection error:'));
connection.once("open", function(){
	var db = connection.db;
	Star.remove({}, function(err){
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

	stars.push(initStar( 1,  "Elnath", 320, 320,  6,    2, waves[0]));
	stars.push(initStar( 2,  "Decrux", 566, 442,  7,    3, waves[1]));
	stars.push(initStar( 3,   "Wezen", 198, 291, 11,    4, waves[2]));
	stars.push(initStar( 4,   "Rigel", 255, 176, 10,    5, waves[3]));
	stars.push(initStar( 5, "Procyon",  84, 202, 11,    6, waves[4]));
	stars.push(initStar( 6,   "Avior",  32,  98,  6,    7, waves[5]));
	stars.push(initStar( 7,    "Nair", 179, 405, 13,    8, waves[6]));
	stars.push(initStar( 8,  "Mirzam", 203, 495,  5,    9, waves[7]));
	stars.push(initStar( 9, "Pavonis", 206, 371, 11,   10, waves[8]));
	stars.push(initStar(10,  "Librae", 412, 148, 10, null, waves[9]));

	var count = 0;
	stars.forEach(function(star){
		star.save(function(){
			count++;
			if(count == stars.length){
				console.log("Complete seed data")
				process.exit(0);
			}
		});
	});
}

function initStar(id, name, x, y, radius, next, waves){
	var star = new Star({
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