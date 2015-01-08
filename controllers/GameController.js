exports.init = function(req, res, callback){
	StarModel.findById(req.body.star).populate('_wave').exec(function(err, star_wave){
		EnermyModel.populate(star_wave, {path:'_wave.enermies._enermy'}, function(err, star_wave_enermy){
			UserModel.findById(req.session.user, function(err, user){
				ShipModel.findById(user._selected_ship, function(err, ship){
					callback(user, ship, star_wave_enermy);
				});
			});
		});
	});
}

exports.getEnermies = function(){

}