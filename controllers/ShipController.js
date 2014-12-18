var mongoose = require('mongoose');
var ShipModel = mongoose.model('Ship');
var ShapeModel = mongoose.model('Shape');
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
	ShipModel.findOne({name:shipName, _user:null}, function(err, model){
		var ship = new ShipModel(model);
		ship._id = mongoose.Types.ObjectId();
		ship._user = user._id;
		ship.save(function(){
			ShapeModel.populate(ship, {path:'_shape'}, function(err, ship){
				callback(ship);
			});
		});
	});
}

exports.purchase = function(){

}

exports.selectShip = function(ship_id, callback){
	ShipModel.findById(ship_id, function(err, ship){
		callback(ship);
	});
}

exports.findByUser = function(user, callback){
	ShipModel.find({"user":user._id}, callback);
}