exports.init = function(req, res, callback){
	StarModel.findById(req.body.star).populate('waves.enemies._enemy').exec(function(err, star_wave){
		console.log(star_wave);
		//EnemyModel.populate(star_wave, {path:'waves.enemies._enemy'}, function(err, star_wave_enemy){
			UserModel.findById(req.session.user, function(err, user){
				ShipModel.findById(user._selected_ship, function(err, ship){
					callback(user, ship, star_wave);
				});
			});
		//});
	});
}

exports.getEnemies = function(){

}