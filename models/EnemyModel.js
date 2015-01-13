var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnemySchema = new Schema({
	_id:Number,
	health:Number,
	exp:Number,
	gold:Number,
	speed:Number,
	range:Number,
	scale:Number,
	firearm:{
		_id:false,
		accuracy:Number,
		damage:Number,
		firerate:Number,
		speed:Number,
		shots:Number,
		shape:{
			_id:false,
			crop_x:Number,
			crop_y:Number,
			width:Number,
			height:Number,
			file:String,
		}
	},
	shape:{
		_id:false,
		crop_x:Number,
		crop_y:Number,
		width:Number,
		height:Number,
		file:String,
	}
});

mongoose.model('Enemy', EnemySchema);