var mongoose = require('mongoose');
var Star = mongoose.model('Star');
var Process = mongoose.model('Process');
var Wave = mongoose.model('Wave');
var Enermy = mongoose.model('Enermy');

exports.getGalaxy = function(req, callback){
	var user = req.session.user;
	Process.findOne({_user:user._id}).populate('_selectable _cleared').exec(function(err, process){
		Star.populate(process, {path:'_selectable._next'}, function(err, process){
			Wave.populate(process, {path:'_selectable._wave'}, function(err, process){
				callback(process);
			});
		});
	});
}

exports.getNextStarID = function(star_id){
	Star.findById(star_id).populate('_next').exec(function(err, star){
		console.log(star);
	});
}