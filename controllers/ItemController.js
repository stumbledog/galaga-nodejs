exports.getItems = function(req, callback){
	var type = req.body.type;
	if(type === "ship"){
		ShipController.getShips(req.session.user._id, function(ships){
			callback(ships);
		});
	}
}

exports.buyShip = function(req, callback){
	var ship_id = req.body.ship_id;
	var user_id = req.session.user._id;
	UserModel.findById(user_id, function(err, user){
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
						req.session.ship = ship;
						callback({code:1,msg:"Successfully purchased",gold:user.gold,user:user, ship:req.session.ship});
					});
				});
			}else{
				callback({code:-1,msg:"Not enough gold"});
			}
		});
	});
}