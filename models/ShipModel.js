var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShipSchema = new Schema({
	name: String,
	components:[{
		x: Number,
		y: Number,
		width: Number,
		height: Number
	}]
});

ShipSchema.methods = {

}

ShipSchema.statics = {
	load: function(option, cb){
		option.select = option.select || 'name';
		this.findOne(option.criteria)
			.select(option.select)
			.exec(cb);
	}
};

mongoose.model('Ship', ShipSchema);