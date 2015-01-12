var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnemySchema = new Schema({
	_id:Number,
	name:String,
	health:Number,
	exp:Number,
	gold:Number,
	speed:Number,
	range:Number,
	width:Number,
	height:Number,
	radius:Number,
	file:String,
	firearm:{
		accuracy:Number,
		damage:Number,
		firerate:Number,
		speed:Number,
		radius:Number,
		shape:{
			crop_x:Number,
			crop_y:Number,
			width:Number,
			height:Number,
		}
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

mongoose.model('Enemy', EnemySchema);