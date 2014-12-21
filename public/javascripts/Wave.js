function Wave(property){

	init(property);

	function init(property){
		createEnermies(property.enermies);
	}

	function createEnermies(enermies){
		enermies.forEach(function(enermy_property){
			var count = enermy_property.count;
			var enermy = new NewEnermy(enermy_property._enermy);
		});
	}
}