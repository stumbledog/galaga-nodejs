var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaveSchema = new Schema({
	_id:Number,
	enermies:[{count:Number, _enermy:{type:Number,ref:'Enermy'}}]
});

mongoose.model('Wave', WaveSchema);