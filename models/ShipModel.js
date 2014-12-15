var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShipSchema = new Schema({
	user:{type:Schema.Types.ObjectId, ref:'User'},
	shape:{type:Schema.Types.ObjectId, ref:'Shape'},
});

mongoose.model('Ship', ShipSchema);