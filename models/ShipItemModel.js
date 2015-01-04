var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShipItemSchema = new Schema({
	_id:Number,	
	price:Number,
	rarity:Number,
	name:String,
	health:Number,
	psychic:Number,
	speed:Number,
	weapons:Number,
	_shape:{type:Number,ref:'Shape'},
	created_at:{type:Date,default:Date.now},
});

mongoose.model('ShipItem', ShipItemSchema);