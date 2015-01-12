var Game = (function(data){

	var instance;

	function init(data){
		console.log(data);
		var enemies=[], star, user, ship, wave;
		var data = data;

		var difficulty = data.difficulty.split(",");
		var bonus = data.bonus;

		var total_damage_dealt = 0;
		var largest_damage_dealt = 0;
		var total_damage_taken = 0;
		var largest_damage_taken = 0;
		var enemy_destoryed = 0;
		var total_exp_gained = 0;
		var total_gold_earned = 0;

		var PLAYING = 0;
		var VICTORY = 1;
		var DEFEAT = -1;

		var status = PLAYING

		var stage = new createjs.Stage("game");
		stage.enableMouseOver(10);
        var manifest = [
            {src:"./assets/images/Components64.png", id:"components"},
            {src:"./assets/images/Ships64.png", id:"ships"},
            {src:"./assets/images/Items64.png", id:"items"},
            {src:"./assets/images/Button64.png", id:"button"},
        ];

        var loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", handleLoadComplete);
        loader.loadManifest(manifest);

        var pause_text = new createjs.Text("PAUSED\nPress 'P' to resume", "bold 24px Arial", "#FFFFFF");
        pause_text.x = stage.canvas.width/2;
        pause_text.y = stage.canvas.height/2;
        pause_text.textAlign = "center";
        pause_text.textBaseline = "alphabetic";

        function handleKeyDown(event){
		    switch(event.keyCode){
		        case 73:
		            return false;
		        case 80:
		            pause();
		            return false;
		        case 86:
		        	public.victory();
		        	return false;
		        default:
		            ship.keyDown(event.keyCode);
		    }
		}

		function handleKeyUp(event){
		    ship.keyUp(event.keyCode);
		}


		function initEventHandler(){
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
			stage.on("stagemousemove", function(event){
				ship.mouseMove(event);
			});
			stage.on("stagemousedown", function(event){
				ship.mouseDown(event);
			});
			stage.on("stagemouseup", function(event){
				ship.mouseUp(event);
			});
		}

		function handleLoadComplete(){
			user = User.getInstance(data.user, data.ship, "game");
			ship = Ship.getInstance(data.ship);
			
			wave = Wave.getInstance(data.star._wave);
			
			balance_controller = new BalanceController(1, difficulty,"game");			
			
			createjs.Ticker.addEventListener("tick", tick);
			createjs.Ticker.setFPS(30);
			
			initEventHandler();
		}

		function pause(){
			if(createjs.Ticker.getPaused()){
				stage.removeChild(pause_text);
				createjs.Ticker.setPaused(false);
			}else{
				stage.addChild(pause_text);
				createjs.Ticker.setPaused(true);
			}
		}

		function renderGameResultPanel(title, msg){
			var panel_container = new createjs.Container();
			var panel = new createjs.Shape();
			var text = new createjs.Text(title,"16px Arial","#fff");
			text.y = -160;

			var return_container = new createjs.Container();
			return_container.x = -100;
			return_container.y = 160;
			return_container.cursor = "pointer";
			var return_text_outline = new createjs.Text("Return to the map","bold 20px Arial", "#000");
			return_text_outline.outline = 5;
			return_text_outline.textAlign = "center";
			return_text_outline.textBaseline = "middle";
			var return_text = return_text_outline.clone();
			return_text.outline = false;
			return_text.color = "#468966";
			return_container.addChild(return_text_outline,return_text);


			var restart_container = new createjs.Container();
			restart_container.x = 100;
			restart_container.y = 160;
			restart_container.cursor = "pointer";
			var restart_text_outline = new createjs.Text("Restart this stage","bold 20px Arial", "#000");
			restart_text_outline.textAlign = "center";
			restart_text_outline.textBaseline = "middle";
			restart_text_outline.outline = 5;
			var restart_text = restart_text_outline.clone();
			restart_text.outline = false;
			restart_text.color = "#B64926";
			restart_container.addChild(restart_text_outline,restart_text);

			panel_container.x = panel_container.y = 320;
			panel.graphics.s("#fff").ss(1).f("#333").rr(-240, -200, 480, 400, 10);
			
			[return_container,restart_container].forEach(function(container){
				container.addEventListener("rollover", function(event){
					container.scaleX = container.scaleY = 1.2;
				});
				container.addEventListener("rollout", function(event){
					container.scaleX = container.scaleY = 1.0;
				});
			});

			restart_container.addEventListener("mousedown", function(event){
				balance_controller.show();
			});

			return_container.addEventListener("mousedown", function(event){
				window.location.replace("/");
			});

			panel_container.addChild(panel, text, restart_container, return_container);

			getStatistic().forEach(function(item){
				var text_outline = new createjs.Text(item.name + ": ", "16px Arial","#000");
				text_outline.x = -200;
				text_outline.y = -120 + 30 * item.index;
				text_outline.outline = 4;

				var text = text_outline.clone();
				text.outline = false;
				text.color = "#FFB03B";

				var amount_outline = new createjs.Text(Math.round(item.value),"16px Arial","#000");
				amount_outline.x = text_outline.getMeasuredWidth() -200;
				amount_outline.y = -120 + 30 * item.index;
				amount_outline.outline = 4;

				var amount = amount_outline.clone();
				amount.outline = false;
				amount.color = "#fff";

				panel_container.addChild(text_outline, text, amount_outline, amount);
			}, this);

			stage.addChild(panel_container);
			stage.update();
		}

		function tick(){
		    if(!createjs.Ticker.getPaused() && status === 0){
		        ship.tick();
		        wave.tick();
		    }
		    stage.update();
		}

		function getStatistic(){
			return [
				{index:0, name:"Total damage dealt", value:total_damage_dealt},
				{index:1, name:"Largest damage dealt", value:largest_damage_dealt},
				{index:2, name:"Total damage taken", value:total_damage_taken},
				{index:3, name:"Largest damage dealt", value:largest_damage_taken},
				{index:4, name:"Number of enemies destroyed", value:enemy_destoryed},
				{index:5, name:"Total exp gained", value:total_exp_gained},
				{index:6, name:"Total gold earned", value:total_gold_earned},
			];
		}

        var public = {
        	getStage:function(){
        		return stage;
        	},
        	getLoader:function(){
        		return loader;
        	},
        	getDifficulty:function(){
        		return difficulty;
        	},
        	getBonus:function(){
        		return bonus;
        	},
        	addDamageDealt:function(dmg){
        		total_damage_dealt += dmg;
        		largest_damage_dealt = dmg > largest_damage_dealt ? dmg : largest_damage_dealt;
        	},
        	addDamageTaken:function(dmg){
        		total_damage_taken += dmg;
        		largest_damage_taken = dmg > largest_damage_taken ? dmg : largest_damage_taken;
        	},
        	enemyDestoryed:function(){
        		enemy_destoryed++;
        	},
        	addExp:function(exp){
        		total_exp_gained += exp;
        	},
        	addGold:function(gold){
        		total_gold_earned += gold;
        	},
        	victory:function(){
        		var value = {level:user.getLevel(), exp:user.getExp(), gold:user.getGold(), star:data.star._id};
				status = VICTORY;
				$.post("/victory", value, function(){
					renderGameResultPanel("Victory");
				});
        	},
			defeat:function(){
				var value = {level:user.getLevel(), exp:user.getExp(), gold:user.getGold()};
				status = DEFEAT;
				var current_wave = wave.getCurrentWave();
				if(current_wave>0){
					$.post("/defeat", value, function(){
						renderGameResultPanel("Defeat");
					});
				}else{
					total_exp_gained = 0;
					total_gold_earned = 0;
					renderGameResultPanel("Defeat! You have to clear first wave to get reward!");
				}
			}
        }
		return public;
	}

	return{
		getInstance:function(data){
			if(!instance){
				instance = init.call(this, data);
			}
			return instance;
		}
	}
})();