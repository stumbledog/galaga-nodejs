var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShipSchema = new Schema({
	name:String,
	level:{type:Number,default:1},
	exp:{type:Number,default:0},
	health:Number,
	psychic:Number,
	speed:Number,
	_user:{type:Schema.Types.ObjectId,ref:'User'},
	_firearm:[{type:Schema.Types.ObjectId,ref:'Firearm'}],
	_shape:{type:Schema.Types.ObjectId,ref:'Shape'},
	created_at:{type:Date,default:Date.now},
});

mongoose.model('Ship', ShipSchema);