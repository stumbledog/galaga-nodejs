var mongoose = require('mongoose');
var ShipModel = mongoose.model('Ship');

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