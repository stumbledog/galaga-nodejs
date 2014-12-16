var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MapSchema = new Schema({
	_id: Number,
	name: String,
	x:Number,
	y:Number,
	_next:[{type: Number, ref: 'Map'}]
});

mongoose.model('Map', MapSchema);