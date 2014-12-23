function Wave(waves){
	this.waves = waves;
	this.wave_count = waves.length;
	this.current_wave = 0;

	this.enermies = [];
	this.enermy_queue = [];

	this.ticks = 0;
	this.interval = 10;
	this.remain_enermy;
	this.spawn = false;

	this.star_clear = false;
	this.mission_clear = false;

	init.call(this);

	function init(){
		this.queueEnermies();
	}
}

Wave.prototype.queueEnermies = function(enermies_array){
	var wave_text = new createjs.Text("Wave " + (this.current_wave + 1), "bold 36px Arial", "#ffffff");
	wave_text.x = -100
	wave_text.y = 320;
	wave_text.textAlign = "center";
	wave_text.textBaseline = "middle";
	stage.addChild(wave_text);

	createjs.Tween.get(wave_text).to({x:320},1000, createjs.Ease.backInOut).wait(1000).to({x:740},1000, createjs.Ease.backInOut);

	this.waves[this.current_wave].enermies.forEach(function(enermy_property){
		for(var i=0;i<enermy_property.count;i++){
			this.enermy_queue.push(enermy_property._enermy);
		}
	}, this);
}

Wave.prototype.spawnEnermy = function(){
	if(this.enermy_queue.length > 0){
		var enermy = new Enermy(this, this.enermy_queue.pop());
		this.enermies.push(enermy);
	}
}

Wave.prototype.enermyDestroyed = function(){
	if(this.enermies.filter(function(enermy){return enermy.status;}).length == 0 && this.enermy_queue.length == 0){
		this.nextWave();
	}
}

Wave.prototype.nextWave = function(){
	if(this.current_wave === this.wave_count){
		this.complete();
	}else{
		this.current_wave++;
		this.queueEnermies();
	}
}

Wave.prototype.complete = function(){
	this.clear = true;
}

Wave.prototype.tick = function(){
	if(!this.clear){
		if(this.ticks > this.interval){
			this.spawnEnermy();
			this.ticks = 0;
		}
		this.enermies.forEach(function(enermy){
			enermy.tick();
		});

		this.ticks++;
	}
}