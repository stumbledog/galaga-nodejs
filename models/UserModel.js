var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	level:{type:Number, default: 1},
	exp:{type:Number, default: 0},
	gold:{type:Number, default: 0},
	mastery:{
		multi_shot:{
			name:{type:String, default:"Multi Shot"},
			description:{type:String, default:"Fires multiple bullets at\nonce"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 10},
		},
		sniper:{
			name:{type:String, default:"Sniper"},
			description:{type:String, default:"Dealt double damage to\nenemy 300 pixels away"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 10},
		},
		slow_bullet:{
			name:{type:String, default:"Slow Bullets"},
			description:{type:String, default:"Slow the speed of enemy\nbullets by 5 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 5},
			max:{type:Number, default: 19},
		},
		reduce_size:{
			name:{type:String, default:"Reduce Size"},
			description:{type:String, default:"Reduce player ship size\nby 25 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 25},
			max:{type:Number, default: 3},	
		}
	},
	_selected_ship: {type:Schema.Types.ObjectId, ref:'Ship'},
	created_at: {type: Date, default: Date.now},
});

UserSchema.methods = {
	
};

UserSchema.virtual("exp_cap").get(function(){
	return this.level * 100;
})

mongoose.model('User', UserSchema);