var mongoose = require('mongoose');
var ShipModel = mongoose.model('Ship');
var ShapeModel = mongoose.model('Shape');

exports.init = function(callback){
	ShipModel.remove().exec();
	var ship = ShipModel({name:"MK-II", components:[{x:58, y:113, width:14, height:28}]});
	ship.save(function(){
		ShipModel.find({}, function(err, ships){
			ships.forEach(function(ship){
				console.log(ship);
				callback();
			});
		});		
	});
}

exports.insert = function (req, res){
    var ship = new Ship();
    ship.save(function(err){
        if(err){
            return res.render('ships',{
                //error:utils.errors(err.errors),
                ship:ship,
                title: 'Sign up'
            });
        }
    });
    return ship;
};

exports.create = function(user, shapeName, callback){
	ShapeModel.findOne({"name":shapeName}, function(err, shape){
		var ship = new ShipModel({
			"name": "Aries",
			"speed": 5,
			"_user": user._id,
			"_shape": shape._id
		});
		ship.save(function(){
			console.log("ship is saved");
			callback();
		});
    });
}

exports.findByUser = function(user, callback){
	ShipModel.find({"user":user._id}, callback);
}