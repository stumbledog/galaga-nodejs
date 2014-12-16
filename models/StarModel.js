var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StarSchema = new Schema({
	_id:Number,
	name:String,
	x:Number,
	y:Number,
	radius:Number,
	_next:[{type:Number, ref: 'Star'}],
	_wave:[{type:Number, ref:'Wave'}]
});

mongoose.model('Star', StarSchema);