var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShapeSchema = new Schema({
	name: String,
	components:[{
		x: Number,
		y: Number,
		width: Number,
		height: Number
	}]
});

mongoose.model('Shape', ShapeSchema);