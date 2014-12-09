var mongoose = require('mongoose');
var crypto = require('crypto');

var mailer = require('../config/mailer');

var Schema = mongoose.Schema;

/**
 * User Schema
 */

var UserSchema = new Schema({
	name: String,
	email: String,
	hashed_password: String,
	password_temp: String,
	authToken: String,
	cookie_ID: String,
	authenticate: {type:Boolean, default:false},
	subscribe: {type:Boolean, default:false},
	created_at: {type:Date, default:Date.now},
	updated_at: {type:Date, default:Date.now}
});

/**
 * Virtuals
 */



/**
 * Validations
 */

var validatePresenceOf = function(value){
	return value && value.length;
}

UserSchema.path('name').validate(function(name){
	if(this.skipValidation()) return true;
	return name.length;
}, "Name cannot be blank");

UserSchema.path('email').validate(function(email){
	if(this.skipValidation()) return true;
	return email.length;
}, "Email cannot be blank");

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next){
	if(!this.isNew) return next();

	if(!validatePresenceOf(this.password)&&!this.skipValidation()){
		next(new Error('invalid password'));
	}else{
		next();
	}
});

/**
 * Methods
 */

UserSchema.methods = {
	authentication: function(plainText){
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	encryptPassword: function(password){
		if(!password) return '';
		try{
			return crypto.createHash('sha256').update(password).digest('hex');
		}catch(err){
			return '';
		}
	},

	hashPassword: function(password){
		var hashed_password = this.encryptPassword(password);
		this.hashed_password = hashed_password;
	},

	skipValidation: function(){
		return false;
	},

	emailAuthentication: function(){
		var smtp_transport = mailer.getSmtpTransport();
		console.log("send mail");
		smtp_transport.sendMail({
			from: "Edward <stumbledog@gmail.com>",
			to: "ed <stumbledog@gmail.com>",
			subject: "Hello ✔",
			text: "Hello world ✔"
		}, function(error, response){
			if(error){
				console.log(error);
			}else{
				console.log("Message sent: " + response.message);
			}
		});
	}
};

/**
 * Statics
 */

UserSchema.statics = {
	load: function(option, cb){
		option.select = option.select || 'name email';
		this.findOne(option.criteria)
			.select(option.select)
			.exec(cb);
	}
};

mongoose.model('User', UserSchema);