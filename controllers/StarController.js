exports.getGalaxy = function(req, callback){
	var user_id = req.session.user;
	ProcessModel.findOne({_user:user_id}).populate('_selectable _cleared').exec(function(err, process){
		StarModel.populate(process, {path:'_selectable._next'}, function(err, process){
			WaveModel.populate(process, {path:'_selectable._wave'}, function(err, process){
				callback(process);
			});
		});
	});
}

exports.getNextStarID = function(star_id){
	StarModel.findById(star_id).populate('_next').exec(function(err, star){
		console.log(star);
	});
}