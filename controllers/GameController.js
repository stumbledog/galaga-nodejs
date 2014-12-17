var mongoose = require('mongoose');
var ShipModel = mongoose.model('Ship');
var StarModel = mongoose.model('Star');
var EnermyModel = mongoose.model('Enermy');

exports.init = function(req, res, callback){
	StarModel.findById(req.body.star).populate('_wave').exec(function(err, star_wave){
		EnermyModel.populate(star_wave, {path:'_wave.enermies._enermy'}, function(err, star_wave_enermy){
			callback(star_wave_enermy);
		});
	});
}