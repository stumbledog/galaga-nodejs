var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StarSchema = new Schema({
	_id:Number,
	name:String,
	x:Number,
	y:Number,
	radius:Number,
	waves:[{enemies:
		[{
			_enemy:{type:Number, ref:'Enemy'},
			count:Number,
		}]
	}],
	_next:[{type:Number, ref: 'Star'}],
});

mongoose.model('Star', StarSchema);