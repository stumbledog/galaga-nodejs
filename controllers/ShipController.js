var mongoose = require('mongoose');
var ShipModel = mongoose.model('Ship');
var ShapeModel = mongoose.model('Shape');
var FirearmModel = mongoose.model('Firearm');

exports.create = function(user, callback){
	var ship1 = new ShipModel({
		name:"Aries",
		price:0,
		health:10,
		psychic:10,
		speed:3,
		purchased:true,
		_user:user._id,
		shape:{
			width:14,
			height:28,
			radius:14,
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
		psychic:10,
		speed:4,
		purchased:false,
		_user:user._id,
		shape:{
			width:12,
			height:26,
			radius:12,
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
		psychic:10,
		speed:2,
		purchased:false,
		_user:user._id,
		shape:{
			width:56,
			height:46,
			radius:46,
			file:"ships",
			components:[{crop_x:129,crop_y:13,width:56,height:46}]
		},
		firearm:{			
			firerate:4,
			accuracy:70,
			bullet:{
				damage:2,
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

exports.purchase = function(ship_id){
	//check balance
}

exports.getShips = function(user_id, callback){
	ShipModel.find({_user:user_id}, function(err, ships){
		callback(ships);
	});
}

exports.select = function(ship_id, callback){
	var self = this;
	ShipModel.findById(ship_id, function(err, ship){
		self.populateShip(ship, callback);
	});
}

exports.populateShip = function(ship, callback){
	ShapeModel.populate(ship, {path:'_shape'}, function(err, ship){
		FirearmModel.populate(ship, {path:'_firearm'}, function(err, ship){
			callback(ship);
		});
	});
}

exports.upgrade = function(ship_id){
	this.select(ship_id, function(ship){
		console.log(ship);
	});
}

exports.findByUser = function(user, callback){
	ShipModel.find({"user":user._id}, callback);
}

exports.getUserShips = function(req, callback){
	ShipModel.find({_user:req.session.user._id}).populate("_shape _firearm").exec(function(err, ships){
		console.log(ships);
		callback(ships);
	});
}