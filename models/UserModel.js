var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	level: {type: Number, default: 1},
	exp: {type: Number, default: 0},
	gold: {type: Number, default: 0},
	_selected_ship: {type:Schema.Types.ObjectId, ref:'Ship'},
	created_at: {type: Date, default: Date.now},
});

UserSchema.methods = {
	
};

UserSchema.virtual("exp_cap").get(function(){
	return this.level * 10;
})

mongoose.model('User', UserSchema);