function Wave(waves){
	this.waves = waves;
	this.wave_count = waves.length;
	this.current_wave = 0;

	this.enermies = [];
	this.waiting_enermies = [];


	this.ticks = 0;
	this.interval = 60;
	this.remain_enermy;
	this.spawn = false;

	init.call(this);

	function init(){
		this.startWave();
	}
}

Wave.prototype.startWave = function(){
	console.log(this.current_wave);
	this.remain_enermy = this.waves[this.current_wave].count;
}

Wave.prototype.createEnermies = function(enermies_array){
	this.waves[this.current_wave].enermies.forEach(function(enermy_property){
		var enermy = new Enermy(this, enermy_property._enermy);
		this.enermies.push(enermy);
	}, this);
}

Wave.prototype.enermyDestroyed = function(){
	this.remain_enermy--;
	console.log(this.remain_enermy);
	if(this.remain_enermy == 0){
		this.nextWave();
	}
}

Wave.prototype.nextWave = function(){
	this.current_wave++;
	if(this.current_wave === this.wave_count){
		console.log("stage clear");
	}else{
		console.log("next wave");
		this.startWave();
	}
}

Wave.prototype.tick = function(){
	if(this.ticks > this.interval){
		this.createEnermies();
		this.ticks = 0;
	}
	this.enermies.forEach(function(enermy){
		enermy.tick();
	});
	this.ticks++;
}