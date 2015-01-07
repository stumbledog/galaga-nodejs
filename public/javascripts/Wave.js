function Wave(waves){
	this.waves = waves;
	this.current_wave = 0;

	this.enermies = [];
	this.enermy_queue = [];

	this.ticks = 0;
	this.interval = 30;
	this.remain_enermy;
	this.spawn = false;
	this.destoryed_enermy_count;
	this.wave_enermy_count;

	this.star_clear = false;
	this.mission_clear = false;

	this.game = Game.getInstance();
	this.stage = this.game.getStage();

	init.call(this);

	function init(){
		/*
		var new_waves = [];
		for(var i = 1; i < this.game.getDifficulty()[4];i++){
			this.waves.forEach(function(wave){
				var new_wave = jQuery.extend({}, wave);
				wave.enermies.forEach(function(enermy){
					enermy.count *= (i+1);
				});
			});
		}*/
		this.wave_count = waves.length;
		this.renderStatus();
		this.queueEnermies();
	}
}

Wave.prototype.renderStatus = function(){
	this.wavetext = new createjs.Text("Wave " + (this.current_wave + 1) + "   " + this.destoryed_enermy_count + " / " + this.wave_enermy_count, "16px Arial", "#fff");
	this.wavetext.y = 10;
	this.wavetext.x = 620;
	this.wavetext.textAlign = "right";
	this.stage.addChild(this.wavetext);
}

Wave.prototype.update = function(){
	this.wavetext.text = "Wave " + (this.current_wave + 1) + "   " + this.destoryed_enermy_count + " / " + this.wave_enermy_count;
}

Wave.prototype.displayText = function(msg){
	var text = new createjs.Text("Wave " + (this.current_wave + 1), "bold 36px Arial", "#ffffff");
	text.x = -100
	text.y = 320;
	text.textAlign = "center";
	text.textBaseline = "middle";
	this.stage.addChild(text);
	return text;
}

Wave.prototype.queueEnermies = function(enermies_array){
	this.destoryed_enermy_count = 0;
	this.wave_enermy_count = 0;
	var text = this.displayText("Wave " + (this.current_wave + 1));
	createjs.Tween.get(text).to({x:320},1000, createjs.Ease.backInOut).wait(1000).to({x:740},1000, createjs.Ease.backInOut);
	this.waves[this.current_wave].enermies.forEach(function(enermy_property){
		this.wave_enermy_count += enermy_property.count * this.game.getDifficulty()[0];
		for(var i=0;i<enermy_property.count * this.game.getDifficulty()[0];i++){
			this.enermy_queue.push(enermy_property._enermy);
		}
	}, this);

	this.update();
}

Wave.prototype.spawnEnermy = function(){
	if(this.enermy_queue.length > 0){
		var enermy = new Enermy(this, this.enermy_queue.pop());
		this.enermies.push(enermy);
	}
}

Wave.prototype.enermyDestroyed = function(){
	this.destoryed_enermy_count++;
	this.update();
	if(this.enermies.filter(function(enermy){return enermy.status;}).length == 0 && this.enermy_queue.length == 0){
		this.nextWave();
	}
}

Wave.prototype.nextWave = function(){
	this.current_wave++;
	if(this.current_wave === this.wave_count){
		game.victory();
	}else{
		this.queueEnermies();
	}
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