var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", function(){
    console.log("db connect opens!");
	
	var kittySchema = mongoose.Schema({
		name:{
			first:String,
			last:String
		},
		age:Number
	});

	kittySchema.virtual('name.full').get(function(){
		return this.name.first+' '+this.name.last;
	});
	
	kittySchema.methods.speak = function(){
		var greeting = "Meow name is "+this.name.full;

		console.log(greeting);
	};

	var Kitten = mongoose.model('Kitten', kittySchema);
	
	Kitten.findOne({age:3}, function(err, koda){
		koda.speak();
	})

});

//db.once("open", console.log.bind(console,"connected"));

