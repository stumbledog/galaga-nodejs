var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShapeSchema = new Schema({
	name: String,
	width: Number,
	height: Number,
	components:[{
		x: Number,
		y: Number,
		width: Number,
		height: Number
	}]
});

mongoose.model('Shape', ShapeSchema);