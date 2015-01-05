var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShipSchema = new Schema({
	name:String,
	health:Number,
	psychic:Number,
	speed:Number,
	weapons:Number,
	_user:{type:Schema.Types.ObjectId,ref:'User'},
	_firearm:[{type:Number,ref:'Firearm'}],
	_shape:{type:Number,ref:'Shape'},
	created_at:{type:Date,default:Date.now},
});

mongoose.model('Ship', ShipSchema);