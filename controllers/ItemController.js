exports.getItems = function(type, callback){
	if(type === "ship"){
		ShipItemModel.find({}).populate("_shape").exec(function(err, ships){
			callback(ships);
		});
	}
}

exports.buyShip = function(ship_id, user_id, callback){
	UserModel.findById(user_id, function(err, user){
		if(err){
			callback({code:-2,msg:"Unauthficated user"});
		}
		ShipItemModel.findById(ship_id, function(err, ship){
			if(err){
				callback({code:-3,msg:"Unauthficated ship"});
			}
			if(user.gold >= ship.price){
				var new_ship = new ShipModel();
				new_ship._user = user._id;
				new_ship._shape = ship._shape;
				new_ship.weapons = ship.weapons;
				new_ship.speed = ship.speed;
				new_ship.psychic = ship.psychic;
				new_ship.health = ship.health;
				new_ship.name = ship.name;
				new_ship.save(function(){
					user.gold -= ship.price;
					user._selected_ship = new_ship._id;
					user.save(function(){
						callback({code:1,msg:"Successfully purchased",gold:user.gold,user:user});
					});
				});
			}else{
				callback({code:-1,msg:"Not enough gold"});
			}
		});
	});
}