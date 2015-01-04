exports.getItems = function(type, callback){
	if(type === "ship"){
		ShipItemModel.find({}).populate("_shape").exec(function(err, ships){
			callback(ships);
		});
	}
}