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

		function renderGameResultPanel(result){
			var title, color, result_msg;
			var panel_container = new createjs.Container();

			if(result == 0){
				title = "Defeat";
				color = "#B64926";
				result_msg = "To get your reward you must clear first wave";
			}else if(result == 1){
				title = "Defeat";
				color = "#B64926";
				result_msg = "";
			}else{
				title = "Victory";
				color = "#3E606F";
				result_msg = "+50% bonus exp & gold";
			}

			var panel = new createjs.Shape();
			var title_outline = new createjs.Text(title,"bold 32px Arial","#fff");
			title_outline.textAlign = "center";
			title_outline.y = -160;
			title_outline.outline = 5;
			var title = title_outline.clone();
			title.outline = false;
			title.color = color;

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

			panel_container.addChild(panel, title_outline, title, restart_container, return_container);

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

				if((item.index ==5 || item.index ==6) && result == 0){
					var bonus_text_outline = new createjs.Text(Math.round(-item.value),"16px Arial","#000");
					bonus_text_outline.x = text_outline.getMeasuredWidth() + amount_outline.getMeasuredWidth() - 200;
					bonus_text_outline.y = -120 + 30 * item.index;
					bonus_text_outline.outline = 4;
					var bonus_text = bonus_text_outline.clone();
					bonus_text.outline = false;
					bonus_text.color = color;
					panel_container.addChild(bonus_text_outline, bonus_text);
				}

				panel_container.addChild(text_outline, text, amount_outline, amount);
			}, this);


			var result_text_outline = new createjs.Text(result_msg,"16px Arial","#000");
			result_text_outline.textAlign = "center";
			result_text_outline.y = 90;
			result_text_outline.outline = 4;
			var result_text = result_text_outline.clone();
			result_text.outline = false;
			result_text.color = color;
			panel_container.addChild(result_text_outline, result_text);

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
        		user.gainExp(total_exp_gained/2);
        		user.earnGold(total_gold_earned/2);
        		var value = {level:user.getLevel(), exp:user.getExp(), gold:user.getGold(), star:data.star._id};
				status = VICTORY;
				$.post("/victory", value, function(){
					renderGameResultPanel(2);
				});
        	},
			defeat:function(){
				var value = {level:user.getLevel(), exp:user.getExp(), gold:user.getGold()};
				status = DEFEAT;
				var current_wave = wave.getCurrentWave();
				if(current_wave>0){
					$.post("/defeat", value, function(){
						renderGameResultPanel(1);
					});
				}else{
					renderGameResultPanel(0);
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