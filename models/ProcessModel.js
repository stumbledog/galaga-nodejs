var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProcessSchema = new Schema({
	_user:{type:Schema.Types.ObjectId, ref:'User'},
	_cleared:[{type:Number, ref:'Star'}],
	_selectable:[{type:Number, ref:'Star'}]
});

mongoose.model('Process', ProcessSchema);