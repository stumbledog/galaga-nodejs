var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FirearmItemSchema = new Schema({
	_id:Number,
	price:Number,
	rarity:Number,
	name:String,
	damage:Number,
	firerate:Number,
	accuracy:Number,
	speed:Number,
	critical_rate:Number,
	critical_damage:Number,
	bonus:{
		damage:Number,
		firerate:Number,
		accuracy:Number,
		critical_rate:Number,
		critical_damage:Number,
	},
	_bullet: {type:Number, ref:'Bullet'},
});

mongoose.model('FirearmItem', FirearmItemSchema);