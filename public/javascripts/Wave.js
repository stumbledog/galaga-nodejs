var Wave = (function(){
	var instance;

	function init(waves){

		var waves = waves;
		var enermies = [], enermy_queue = [];

		var game = Game.getInstance();
		var stage = game.getStage();

		var current_wave = ticks = 0;
		var interval = 30 / game.getDifficulty()[0];
		var wave_count = waves.length;
		console.log(wave_count);

		var wavetext, destoryed_enermy_count, wave_enermy_count;

		renderStatus();
		queueEnermies();

		function renderStatus(){
			wavetext = new createjs.Text("Wave " + (current_wave + 1) + "   " + destoryed_enermy_count + " / " + wave_enermy_count, "16px Arial", "#fff");
			wavetext.y = 10;
			wavetext.x = 620;
			wavetext.textAlign = "right";
			stage.addChild(wavetext);
		}

		function queueEnermies(){
			destoryed_enermy_count = 0;
			wave_enermy_count = 0;
			slideWaveText("Wave " + (current_wave + 1));
			
			waves[current_wave].enermies.forEach(function(enermy_property){
				wave_enermy_count += enermy_property.count * game.getDifficulty()[0];
				for(var i=0;i<enermy_property.count * game.getDifficulty()[0];i++){
					enermy_queue.push(enermy_property._enermy);
				}
			});

			update();
		}

		function update(){
			wavetext.text = "Wave " + (current_wave + 1) + "   " + destoryed_enermy_count + " / " + wave_enermy_count;
		}

		function slideWaveText(msg){
			var text = new createjs.Text("Wave " + (current_wave + 1), "bold 36px Arial", "#ffffff");
			text.x = -100
			text.y = 320;
			text.textAlign = "center";
			text.textBaseline = "middle";
			stage.addChild(text);
			createjs.Tween.get(text).to({x:320},1000, createjs.Ease.backInOut).wait(1000).to({x:740},1000, createjs.Ease.backInOut);
			return text;
		}

		function spawnEnermy(){
			if(enermy_queue.length > 0){
				var enermy = new Enermy(enermy_queue.shift());
				enermies.push(enermy);
			}
		}

		function nextWave(){
			current_wave++;
			if(current_wave === wave_count){
				game.victory();
			}else{
				queueEnermies();
			}
		}

		return {
			getEnermies:function(){
				return enermies;
			},
			enermyDestroyed:function(){
				destoryed_enermy_count++;
				update();
				if(enermies.filter(function(enermy){return enermy.status;}).length == 0 && enermy_queue.length == 0){
					nextWave();
				}
			},
			tick:function(){
				if(ticks > interval){
					spawnEnermy();
					ticks = 0;
				}
				enermies.forEach(function(enermy){
					enermy.tick();
				});
				ticks++;
			},
			getCurrentWave:function(){
				return current_wave;
			}
		}
	}

	return{
		getInstance:function(waves){
			if(!instance){
				instance = init(waves);
			}
			return instance;
		}
	}
})();