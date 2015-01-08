var Game = (function(data){
	
	var instance;

	function init(data){
		console.log(data);
		var enermies=[], star, user, ship, wave;
		var data = data;

		var difficulty = data.difficulty.split(",");
		var bonus = data.bonus;

		var total_damage_dealt = 0;
		var largest_damage_dealt = 0;
		var total_damage_taken = 0;
		var largest_damage_taken = 0;
		var enermy_destoryed = 0;
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

		function renderGameResultPanel(title){
			var panel_container = new createjs.Container();
			var panel = new createjs.Shape();
			var restart_button = new createjs.Bitmap(loader.getResult("button"));
			var map_button = new createjs.Bitmap(loader.getResult("button"));
			var text = new createjs.Text(title,"32px Arial","#fff");
			var restart_text = new createjs.Text("Restart this stage","16px Arial","#fff");
			var map_text = new createjs.Text("Return to the map","16px Arial","#fff");

			panel_container.x = panel_container.y = 320;
			panel.graphics.s("#fff").ss(1).f("#333").rr(-200, -200, 400, 400, 10);
			restart_button.sourceRect = new createjs.Rectangle(638,1324,64,64);
			map_button.sourceRect = new createjs.Rectangle(638,1550,64,64);

			restart_button.regX = restart_button.regY = map_button.regX = map_button.regY = 32;
			restart_button.x = 64;
			map_button.x = -64;
			restart_button.y = map_button.y = 140;
			restart_button.cursor = map_button.cursor = "pointer";
			text.regX = text.getMeasuredWidth()/2;
			text.y = -180;
			restart_text.x = 0;
			map_text.x = -130;
			restart_text.y = map_text.y = 180;

			restart_button.addEventListener("rollover", function(event){
				restart_button.scaleX = restart_button.scaleY = 1.2;
				panel_container.addChild(restart_text);
				stage.update();
			});

			restart_button.addEventListener("rollout", function(event){
				restart_button.scaleX = restart_button.scaleY = 1;
				panel_container.removeChild(restart_text);
				stage.update();
			});

			restart_button.addEventListener("mousedown", function(event){
				balance_controller.show();
			});

			map_button.addEventListener("rollover", function(event){
				map_button.scaleX = map_button.scaleY = 1.2;
				panel_container.addChild(map_text);
				stage.update();
			});

			map_button.addEventListener("rollout", function(event){
				map_button.scaleX = map_button.scaleY = 1;
				panel_container.removeChild(map_text);
				stage.update();
			});

			map_button.addEventListener("mousedown", function(event){
				window.location.replace("/");
			});

			panel_container.addChild(panel, restart_button, map_button, text);

			getStatistic().forEach(function(item){
				var text = new createjs.Text(item.name + ": " + item.value.toFixed(0), "16px Arial","#fff");
				text.x = -160;
				text.y = -120 + 30 * item.index;
				panel_container.addChild(text);
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
				{index:4, name:"Number of enermies destroyed", value:enermy_destoryed},
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
        	enermyDestoryed:function(){
        		enermy_destoryed++;
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
				$.post("/defeat", value, function(){
					renderGameResultPanel("Defeat");
				});
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