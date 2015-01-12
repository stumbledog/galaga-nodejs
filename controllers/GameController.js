exports.init = function(req, res, callback){
	StarModel.findById(req.body.star).populate('_wave').exec(function(err, star_wave){
		EnemyModel.populate(star_wave, {path:'_wave.enemies._enemy'}, function(err, star_wave_enemy){
			UserModel.findById(req.session.user, function(err, user){
				ShipModel.findById(user._selected_ship, function(err, ship){
					callback(user, ship, star_wave_enemy);
				});
			});
		});
	});
}

exports.getEnemies = function(){

}