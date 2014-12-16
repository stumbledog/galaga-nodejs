var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/galaga');

var db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));
db.on("open", function(){
    console.log("db connect opens!");
});

var models_path = __dirname + '/models'
  , model_files = fs.readdirSync(models_path)
model_files.forEach(function (file) {
	require(models_path+'/'+file);
/*
	if (file == 'user.js')
		User = require(models_path+'/'+file)
	else
		require(models_path+'/'+file)
*/		
});