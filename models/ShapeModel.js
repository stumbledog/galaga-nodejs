var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShapeSchema = new Schema({
	_id:Number,
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
});

mongoose.model('Shape', ShapeSchema);