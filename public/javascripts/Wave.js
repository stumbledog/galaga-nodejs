function Wave(stage, image_loader, property){
	var stage = stage;
	var image_loader = image_loader;

	init(property);

	function init(property){
		createEnermies(property.enermies);
	}

	function createEnermies(enermies){
		enermies.forEach(function(enermy_property){
			var count = enermy_property.count;
			var enermy = new NewEnermy(stage, image_loader, enermy_property._enermy);
		});
	}
}