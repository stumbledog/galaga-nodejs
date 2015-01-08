exports.getItems = function(req, callback){
	var type = req.body.type;
	if(type === "ship"){
		ShipController.getShips(req.session.user, function(ships){
			callback(ships);
		});
	}
}

exports.buyShip = function(req, callback){
	var ship_id = req.body.ship_id;
	UserModel.findById(req.session.user, function(err, user){
		if(err){
			callback({code:-2,msg:"Unauthficated user"});
		}
		ShipModel.findById(ship_id, function(err, ship){
			if(err){
				callback({code:-3,msg:"Unauthficated ship"});
			}
			if(user.gold >= ship.price){
				user.gold -= ship.price;
				user._selected_ship = ship._id;
				user.save(function(err, user){
					ship.purchased = true;
					ship.save(function(err, ship){
						callback({code:1,msg:"Successfully purchased",gold:user.gold,user:user, ship:ship});
					});
				});
			}else{
				callback({code:-1,msg:"Not enough gold"});
			}
		});
	});
}