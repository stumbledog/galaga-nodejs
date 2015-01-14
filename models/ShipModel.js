var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShipSchema = new Schema({
	price:Number,
	name:String,
	health:Number,
	armor:Number,
	speed:Number,
	purchased:Boolean,
	shape:{
		_id:false,
		crop_x:Number,
		crop_y:Number,
		width:Number,
		height:Number,
		file:String,
	},
	firearm:{
		_id:false,
		firerate: Number,
		accuracy: Number,
		shots:Number,
		bullet: {
			_id:false,
			damage: Number,
			speed: Number,
			critical_rate: Number,
			critical_damage: Number,
			shape:{
				_id:false,
				crop_x:Number,
				crop_y:Number,
				width:Number,
				height:Number,
				file:String,
			}
		},
	},
	upgrade:{
		health:{count:{type:Number,default:0},value:{type:Number,default:0}},
		armor:{count:{type:Number,default:0},value:{type:Number,default:0}},
		speed:{count:{type:Number,default:0},value:{type:Number,default:0}},
		firerate:{count:{type:Number,default:0},value:{type:Number,default:0}},
		accuracy:{count:{type:Number,default:0},value:{type:Number,default:0}},
		damage:{count:{type:Number,default:0},value:{type:Number,default:0}},
		critical_rate:{count:{type:Number,default:0},value:{type:Number,default:0}},
		critical_damage:{count:{type:Number,default:0},value:{type:Number,default:0}},
	},
	_user:{type:Schema.Types.ObjectId,ref:'User'},
});

mongoose.model('Ship', ShipSchema);