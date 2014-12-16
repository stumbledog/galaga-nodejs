var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProcessSchema = new Schema({
	_user:{type:Schema.Types.ObjectId, ref:'User'},
	_star:{type:Number, ref:'Star'},
	clear:{type:Boolean, default: false},
});

mongoose.model('Process', ProcessSchema);