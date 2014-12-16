var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	level: {type: Number, default: 1},
	exp: {type: Number, default: 0},
	created_at: {type: Date, default: Date.now},
});

UserSchema.methods = {
	
};


mongoose.model('User', UserSchema);