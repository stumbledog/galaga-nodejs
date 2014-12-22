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
	firearm:{
		damage:Number,
		firerate:Number,
		speed:Number
	},
	components:[{
		x:{type:Number,default:0},
		y:{type:Number,default:0},
		crop_x:Number,
		crop_y:Number,
		width:Number,
		height:Number
	}]
});

mongoose.model('Enermy', EnermySchema);