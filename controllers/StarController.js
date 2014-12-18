var mongoose = require('mongoose');
var Star = mongoose.model('Star');
var Process = mongoose.model('Process');
var Wave = mongoose.model('Wave');
var Enermy = mongoose.model('Enermy');

exports.getGalaxy = function(req, callback){
	var user = req.session.user;	
	Process.find({_user:user._id}).populate('_star').exec(function(err, processes){
		Star.populate(processes, {path:'_star._next'}, function(err, processes){
			Wave.populate(processes, {path:'_star._wave'}, function(err, processes){
				callback(processes);
			});
		});
	});
}