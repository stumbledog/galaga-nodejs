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
		width:Number,
		height:Number,
		radius:Number,
		file:String,
		components:[{
			x:{type:Number,default:0},
			y:{type:Number,default:0},
			crop_x:Number,
			crop_y:Number,
			width:Number,
			height:Number
		}]
	},
	firearm:{
		firerate: Number,
		accuracy: Number,
		bullet: {
			damage: Number,
			speed: Number,
			critical_rate: Number,
			critical_damage: Number,
			radius:Number,
			shape:{
				crop_x:Number,
				crop_y:Number,
				width:Number,
				height:Number
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
	created_at:{type:Date,default:Date.now},
});

mongoose.model('Ship', ShipSchema);