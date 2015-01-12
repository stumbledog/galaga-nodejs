var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaveSchema = new Schema({
	_id:Number,
	enemies:[{count:Number, _enemy:{type:Number,ref:'Enemy'}}]
});

mongoose.model('Wave', WaveSchema);