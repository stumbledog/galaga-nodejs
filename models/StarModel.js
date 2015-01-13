var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StarSchema = new Schema({
	_id:Number,
	name:String,
	x:Number,
	y:Number,
	radius:Number,
	waves:[{
		_id:false,
		enemies:
		[{
			_id:false,
			_enemy:{type:Number, ref:'Enemy'},
			count:Number,
		}]
	}],
	next:{type:Number, ref: 'Star'},
});

mongoose.model('Star', StarSchema);