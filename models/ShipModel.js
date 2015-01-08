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
		health:{type:Number,default:0},
		armor:{type:Number,default:0},
		firerate:{type:Number,default:0},
		accuracy:{type:Number,default:0},
		damage:{type:Number,default:0},
		critical_rate:{type:Number,default:0},
		critical_damage:{type:Number,default:0},
	},
	_user:{type:Schema.Types.ObjectId,ref:'User'},
	created_at:{type:Date,default:Date.now},
});

mongoose.model('Ship', ShipSchema);