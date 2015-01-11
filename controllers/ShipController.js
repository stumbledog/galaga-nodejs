exports.create = function(user, callback){
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
				radius:1,
				critical_rate:0.1,
				critical_damage:2,
				shape:{
					crop_x:124,
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
				radius:1,
				critical_rate:0.15,
				critical_damage:2.5,
				shape:{
					crop_x:124,
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
				damage:3,
				speed:20,
				radius:1,
				critical_rate:0.1,
				critical_damage:2,
				shape:{
					crop_x:124,
					crop_y:231,
					width:10,
					height:4
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