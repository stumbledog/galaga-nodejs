var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnermySchema = new Schema({
	_id:Number,
	name:String,
	health:Number,
	exp:Number,
	gold:Number,
	speed:Number,
	range:Number,
	width:Number,
	height:Number,
	components:[{
		x:Number,
		y:Number,
		width:Number,
		height:Number
	}]
});

mongoose.model('Enermy', EnermySchema);