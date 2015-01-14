exports.init = function(req, res, callback){
	StarModel.findById(req.body.star).populate('waves.enemies._enemy').exec(function(err, star_wave){
		UserModel.findById(req.session.user, function(err, user){
			ShipModel.findById(user._selected_ship, function(err, ship){
				callback(user, ship, star_wave);
			});
		});
	});
}

exports.getGalaxy = function(req, callback){
	var user_id = req.session.user;
	ProcessModel.findOne({_user:user_id}).populate('_selectable _cleared').exec(function(err, process){
		StarModel.populate(process, {path:'_selectable._next'}, function(err, process){
			callback(process);
		});
	});
}