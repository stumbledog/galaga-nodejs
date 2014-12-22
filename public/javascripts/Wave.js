function Wave(waves){
	var waves = waves;
	var wave_count = waves.length;
	var current_wave = 0;

	this.enermies = [];
	this.ticks = 0;

	init.call(this, waves);

	function init(waves){
		startWave.call(this, waves[current_wave]);
	}

	function startWave(wave){
		createEnermies.call(this, wave.enermies);
	}

	function createEnermies(enermies_array){
		enermies_array.forEach(function(enermy_property){
			var count = enermy_property.count;
			for(var i = 0; i<count;i++){
				var enermy = new NewEnermy(enermy_property._enermy);
				this.enermies.push(enermy);
			}
		}, this);
	}
}

Wave.prototype.tick = function(){
	this.enermies.forEach(function(enermy){
		enermy.tick();
	});
	this.ticks++;
}