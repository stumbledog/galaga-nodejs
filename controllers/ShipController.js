exports.create = function(user, callback){

	var bullet_shapes = [
		{crop_x:139,crop_y:231,width:10,height: 4,file:"items"},
		{crop_x:134,crop_y:239,width: 6,height: 6,file:"items"},
		{crop_x: 39,crop_y:229,width:21,height:11,file:"items"},
	];

	var ship_shapes = [
		{crop_x: 74,crop_y:  4,width: 51,height: 54,file:"ships"},
		{crop_x:129,crop_y: 13,width: 56,height: 47,file:"ships"},
		{crop_x:  7,crop_y: 77,width: 54,height: 47,file:"ships"},
		{crop_x: 64,crop_y: 75,width: 58,height: 49,file:"ships"},
		{crop_x:124,crop_y: 66,width: 57,height: 57,file:"ships"},
		{crop_x:150,crop_y:143,width: 77,height: 53,file:"ships"},
		{crop_x:  2,crop_y:211,width: 70,height: 51,file:"ships"},
		{crop_x:235,crop_y:213,width: 74,height: 47,file:"ships"},
		{crop_x: 81,crop_y:286,width: 70,height: 54,file:"ships"},
		{crop_x:109,crop_y:356,width:124,height: 68,file:"ships"},
		{crop_x:170,crop_y:440,width:143,height:108,file:"ships"},
	];

	var ships = [];
	ships.push(initShip(      "Aries",     0, 100, 0,5, true, ship_shapes[0],15,90,2, 1,10,0.1,2,bullet_shapes[0]));
	ships.push(initShip(     "Taurus",   400, 200, 4,4,false, ship_shapes[1],30,90,4, 2,10,0.1,3,bullet_shapes[0]));
	ships.push(initShip(     "Gemini",   800, 400, 4,3,false, ship_shapes[2],20,70,4, 4,20,0.2,2,bullet_shapes[1]));
	ships.push(initShip(        "Leo",  1600, 400,10,4,false, ship_shapes[3],15,90,2,10,10,0.2,3,bullet_shapes[1]));
	ships.push(initShip(      "Virgo",  3200, 500,10,6,false, ship_shapes[4],15,90,2,15,10,0.1,3,bullet_shapes[1]));
	ships.push(initShip(      "Libra",  6400,1500,10,2,false, ship_shapes[5],15,70,2,20,10,0.1,3,bullet_shapes[1]));
	ships.push(initShip(    "Scorpio", 12800, 900,12,3,false, ship_shapes[6],15,70,2,30,10,0.2,3,bullet_shapes[0]));
	ships.push(initShip("Sagittarius", 25600, 700,15,4,false, ship_shapes[7],20,70,3,30,10,0.2,3,bullet_shapes[0]));
	ships.push(initShip(  "Capricorn", 51200,1600,20,5,false, ship_shapes[8],30,80,4,30,20,0.3,4,bullet_shapes[2]));
	ships.push(initShip(   "Aquarius",102400,2400,32,6,false, ship_shapes[9],25,70,4,40,10,0.2,3,bullet_shapes[2]));
	ships.push(initShip(     "Pisces",204800,5000,64,2,false,ship_shapes[10],30,70,5,40,10,0.5,3,bullet_shapes[2]));

	function initShip(name, price, health, armor, speed, purchased, shape, firerate, accuracy, shots, damage, bullet_speed, critical_rate, critical_damage, bullet_shape){
		var ship = new ShipModel({
			name:name,
			price:price,
			health:health,
			armor:armor,
			speed:speed,
			purchased:purchased,
			_user:user._id,
			shape:shape,
			firearm:{
				firerate:firerate,
				accuracy:accuracy,
				shots:shots,
				bullet:{
					damage:damage,
					speed:bullet_speed,
					critical_rate:critical_rate,
					critical_damage:critical_damage,
					shape:bullet_shape,
				}
			},
		});
		return ship;
	}

	var count = 0;
	ships.forEach(function(ship){
		ship.save(function(){
			count++;
			if(count == ships.length){
				ShipModel.findOne({_user:user._id, purchased:true}, function(err, selected_ship){
					user._selected_ship = selected_ship._id;
					user.save(function(){
						console.log("Complete seed data");
						callback(selected_ship);
					});
				});
			}
		});
	});

	/*
	var ship1 = new ShipModel({
		name:"Aries",
		price:50,
		health:10,
		armor:0,
		psychic:10,
		speed:3,
		purchased:true,
		_user:user._id,
		shape:{
			width:14,
			height:28,
			radius:7,
			file:"components",
			components:[{crop_x:58,crop_y:113,width:14,height:28}]
		},
		firearm:{
			firerate:5,
			accuracy:80,
			bullet:{
				damage:1,
				speed:20,
				radius:2,
				critical_rate:0.1,
				critical_damage:2,
				shape:{
					crop_x:139,
					crop_y:231,
					width:10,
					height:4
				}
			}
		},
	});

	var ship2 = new ShipModel({
		name:"Aries",
		price:100,
		health:20,
		armor:0,
		psychic:10,
		speed:4,
		purchased:false,
		_user:user._id,
		shape:{
			width:12,
			height:26,
			radius:6,
			file:"components",
			components:[{crop_x:75,crop_y:345,width:12,height:26}]
		},
		firearm:{
			firerate:7,
			accuracy:90,
			bullet:{
				damage:2,
				speed:20,
				radius:2,
				critical_rate:0.15,
				critical_damage:2.5,
				shape:{
					crop_x:139,
					crop_y:231,
					width:10,
					height:4
				}
			}
		},
	});

	var ship3 = new ShipModel({
		name:"Aries",
		price:1000,
		health:100,
		armor:0,
		psychic:10,
		speed:2,
		purchased:false,
		_user:user._id,
		shape:{
			width:56,
			height:46,
			radius:23,
			file:"ships",
			components:[{crop_x:129,crop_y:13,width:56,height:46}]
		},
		firearm:{			
			firerate:4,
			accuracy:70,
			bullet:{
				damage:10,
				speed:20,
				radius:3,
				critical_rate:0.2,
				critical_damage:2.5,
				shape:{
					crop_x:134,
					crop_y:239,
					width:6,
					height:6
				}
			}
		},
	});


	ship1.save(function(err, ship){
		ship._user = user._id;
		user._selected_ship = ship._id;
		user.save(function(){
			callback(ship);
		});
	});
	ship2.save();
	ship3.save();
	*/
}

exports.upgrade = function(req, callback){
	var type = req.body.type;
	var ship_id = req.body.ship;
	var multiple = parseInt(req.body.multiple);

	UserModel.findById(req.session.user, function(err, user){
		ShipModel.findById(ship_id, function(err, ship){
			var upgrade, upgrade_unit;
			if(type === "Health"){
				upgrade = ship.upgrade.health;
				upgrade_unit = 1;
			}else if(type === "Armor"){
				upgrade = ship.upgrade.armor;
				upgrade_unit = 0.1;
			}else if(type === "Speed"){
				upgrade = ship.upgrade.speed;
				upgrade_unit = 0.1;
			}else if(type === "Firerate"){
				if(ship.firearm.firerate + ship.upgrade.firerate.value -0.01 * multiple < 1){
					console.log(ship.firearm.firerate + ship.upgrade.firerate * multiple);
					callback({code:-1, msg:"Reached maximum firerate", ship:ship});
					return;
				}
				upgrade = ship.upgrade.firerate;
				upgrade_unit = -0.01;
			}else if(type === "Accuracy"){
				if(ship.firearm.accuracy + ship.upgrade.accuracy.value + 0.1 * multiple > 100){
					callback({code:-1, msg:"Reached maximum accuracy", ship:ship});
					return;
				}
				upgrade = ship.upgrade.accuracy;
				upgrade_unit = 0.1;
			}else if(type === "Damage"){
				upgrade = ship.upgrade.damage;
				upgrade_unit = 0.1;
			}else if(type === "Crit Damage"){
				upgrade = ship.upgrade.critical_damage;
				upgrade_unit = 0.01;
			}else if(type === "Crit Rate"){
				if(ship.firearm.bullet.critical_rate + ship.upgrade.critical_rate.value + 0.001* multiple > 1){
					callback({code:-1, msg:"Reached maximum critical rate", ship:ship});
					return;
				}
				upgrade = ship.upgrade.critical_rate;
				upgrade_unit = 0.001;
			}

			var count = upgrade.count;
			var current_price = 10 * (1 + count);

			var price = multiple * (current_price * 2 + (multiple-1) * 10)/2;
			console.log(price);

			if(user.gold >= price){
				user.gold -= price;
				user.save(function(){
					upgrade.count += multiple;
					upgrade.value += upgrade_unit * multiple;
					ship.save(function(){
						callback({code:1, ship:ship, gold:user.gold, upgrade:upgrade});
					});
				});
			}else{
				callback({code:-1, msg:"Not enough gold", ship:ship});
			}
		});
	});
}

exports.purchase = function(ship_id){
	//check balance
}

exports.getShips = function(user_id, callback){
	ShipModel.find({_user:user_id}).sort("price").exec(function(err, ships){
		callback(ships);
	});
}

exports.select = function(ship_id, callback){
	var self = this;
	ShipModel.findById(ship_id, function(err, ship){
		callback(ship);
	});
}

exports.selectShip = function(req, callback){
	var ship_id = req.body.ship;
	UserModel.findById(req.session.user, function(err, user){
		user._selected_ship = ship_id;
		user.save(function(){
			callback({code:1});
		});
	});
}

exports.populateShip = function(ship, callback){
	
}

exports.findByUser = function(user, callback){
	ShipModel.find({"user":user._id}, callback);
}

exports.getUserShips = function(req, callback){
	ShipModel.find({_user:req.session.user, purchased:true}).populate("_shape _firearm").exec(function(err, ships){
		callback(ships);
	});
}