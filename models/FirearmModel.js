var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FirearmSchema = new Schema({
	name: String,
	rarity: Number,
	cost: Number,
	damage: Number,
	firerate: Number,
	accuracy: Number,
	speed: Number,
	critical_rate: Number,
	critical_damage: Number,
	bonus:{
		damage: Number,
		firerate: Number,
		accuracy: Number,
		critical_rate: Number,
		critical_damage: Number,
	},
	_bullet: {type:Number, ref:'Bullet'},
	_user: {type:Schema.Types.ObjectId, ref:'User'}
});

mongoose.model('Firearm', FirearmSchema);