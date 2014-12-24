function Wave(waves){
	this.waves = waves;
	this.wave_count = waves.length;
	this.wave_count = 1;
	this.current_wave = 0;

	this.enermies = [];
	this.enermy_queue = [];

	this.ticks = 0;
	this.interval = 30;
	this.remain_enermy;
	this.spawn = false;

	this.star_clear = false;
	this.mission_clear = false;

	init.call(this);

	function init(){
		this.queueEnermies();
	}
}

Wave.prototype.displayText = function(msg){
	var text = new createjs.Text("Wave " + (this.current_wave + 1), "bold 36px Arial", "#ffffff");
	text.x = -100
	text.y = 320;
	text.textAlign = "center";
	text.textBaseline = "middle";
	stage.addChild(text);
	return text;
}

Wave.prototype.queueEnermies = function(enermies_array){
	var text = this.displayText("Wave " + (this.current_wave + 1));
	createjs.Tween.get(text).to({x:320},1000, createjs.Ease.backInOut).wait(1000).to({x:740},1000, createjs.Ease.backInOut);

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
	this.current_wave++;
	if(this.current_wave === this.wave_count){
		this.victory();
	}else{
		this.queueEnermies();
	}
}

Wave.prototype.victory = function(){
	this.clear = true;
	var text = this.displayText("Victory");
	createjs.Tween.get(text).to({x:320},1000, createjs.Ease.backInOut).wait(1000).call(this.submit);
}

Wave.prototype.submit = function(){
	console.log("submit");
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