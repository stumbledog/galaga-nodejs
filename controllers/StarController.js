var mongoose = require('mongoose');
var Star = mongoose.model('Star');
var Process = mongoose.model('Process');

exports.getGalaxy = function(req, callback){
	var user_id = req.session.user_id;
	Process.find({_user:user_id}).populate('_star').exec(function(err, processes){
		Star.populate(processes, {path:'_star._next'}, function(err, processes){
			console.log(processes);
			callback(processes);
		});
	});
}