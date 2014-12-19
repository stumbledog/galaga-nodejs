var mongoose = require('mongoose');
var ShipModel = mongoose.model('Ship');
var ShapeModel = mongoose.model('Shape');
var FirearmModel = mongoose.model('Firearm');
/*
exports.init = function(callback){
	ShipModel.remove().exec();
	var ship = ShipModel({name:"MK-II", components:[{x:58, y:113, width:14, height:28}]});
	ship.save(function(){
		ShipModel.find({}, function(err, ships){
			ships.forEach(function(ship){
				//console.log(ship);
				callback();
			});
		});		
	});
}
*/
exports.create = function(user, shipName, callback){
	var self = this;
	ShipModel.findOne({name:shipName, _user:null}, function(err, model){
		var ship = new ShipModel(model);
		ship._id = mongoose.Types.ObjectId();
		ship._user = user._id;
		ship.save(function(){
			self.populateShip(ship, callback);
		});
	});
}

exports.purchase = function(ship_id){
	//check balance
}

exports.getShips = function(user, callback){
	ShipModel.find({_user:user._id}, function(err, ships){
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