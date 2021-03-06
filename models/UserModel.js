var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	level:{type:Number, default: 1},
	exp:{type:Number, default: 0},
	gold:{type:Number, default: 0},
	mastery:{
		_id:false,
		increase_damage:{
			_id:false,
			name:{type:String, default:"Increase Damage"},
			description:{type:String, default:"Increase damage by\n10 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 1},
		},
		increase_health:{
			_id:false,
			name:{type:String, default:"Increase Health"},
			description:{type:String, default:"Increase health by\n10 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 1},
		},
		increase_speed:{
			_id:false,
			name:{type:String, default:"Increase Speed"},
			description:{type:String, default:"Increase speed by\n10 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 1},
			max:{type:Number, default: 20},
		},
		increase_accuracy:{
			_id:false,
			name:{type:String, default:"Increase Accuracy"},
			description:{type:String, default:"Increase accuracy by\n10 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 1},
		},
		decrease_accuracy:{
			_id:false,
			name:{type:String, default:"Decrease Accuracy"},
			description:{type:String, default:"Decrease accuracy by\n10 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 1},
			max:{type:Number, default: 10},
		},
		multi_shot:{
			_id:false,
			name:{type:String, default:"Multi Shot"},
			description:{type:String, default:"Fires multiple bullets at\nonce"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 5},
		},
		slow_bullet:{
			_id:false,
			name:{type:String, default:"Slow Bullets"},
			description:{type:String, default:"Slow the speed of enemy\nbullets by 5 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 2},
			max:{type:Number, default: 19},
		},
		reduce_size:{
			_id:false,
			name:{type:String, default:"Reduce Size"},
			description:{type:String, default:"Reduce player ship size\nby 25 x point%"},
			point:{type:Number, default: 0},
			cost:{type:Number, default: 5},
			max:{type:Number, default: 3},
		},
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