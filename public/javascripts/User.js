var User = (function(){

	var instance;

	function init(user, ship, home, game){
		var level = user.level;
		var exp = user.exp;
		var exp_cap = user.level * 10;
		var gold = user.gold;
		//var selected_ship = user._selected_ship;
		var home = home;
		var game = game;

		var gold_text, level_text;
		var shape_container = new createjs.Container();

		function renderGold(){
			gold_text = new createjs.Text(gold.toFixed(0)  + " Gold", "12px Arial", "#FFBE2C");
			gold_text.x = 20;
			gold_text.y = 614;
			stage.addChild(gold_text);
		}

		function renderLevel(){
			level_text = new createjs.Text(level + " Level", "12px Arial", "#FFFFFF");
			level_text.x = 20;
			level_text.y = 600;
			stage.addChild(level_text);
		}

		function renderExpBar(){
			var exp_bar_border = new createjs.Shape();
			exp_bar_border.graphics.beginStroke("#fff").drawRect(169, 626, 302, 14);
			exp_bar = new createjs.Shape();
			exp_bar.graphics.beginFill("#FCFFF5").drawRect(170, 627, 300 * (exp / exp_cap), 12);
			exp_text = new createjs.Text("Level " + user.level + " Exp " + (exp / exp_cap * 100).toFixed(2)+"%","10px Arial","#888");
			exp_text.y = 628;
			exp_text.x = 320 - exp_text.getMeasuredWidth()/2;
			stage.addChild(exp_bar_border, exp_bar, exp_text);
		}

		function initShip(){
			shape_container.removeAllChildren();
			shape_container.x = 40;
			shape_container.y = 570;
			stage.addChild(shape_container);
			renderShip();
		}

		function renderShip(){
			shape_container.removeAllChildren();
			ship.shape.components.forEach(function(component){
				var shape = new createjs.Shape();
				shape.graphics.bf(loader.getResult(ship.shape.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
				shape.regX = component.crop_x + component.width / 2;
				shape.regY = component.crop_y + component.height / 2;
				shape.x = component.x;
				shape.y = component.y;
				shape_container.addChild(shape);
				stage.update();
			});
		}

		function levelUp(){
			exp -= level * 10;
			level++;
			level_text = level + " Level";
			exp_cap = level * 10;
			ship.levelUp();
			if(exp >= level * 10){
				levelUp();
			}
		}

		function refreshExpBar(){
			exp_bar.graphics.c().beginFill("#FCFFF5").drawRect(170, 627, 300*(exp / exp_cap), 12);
			exp_text.text = "Level " + level + " Exp " + (exp / exp_cap * 100).toFixed(2)+"%";
		}

		return{
			render:function(){
				renderGold();
				renderLevel();
				initShip();
				if(game){
					renderExpBar();
				}
			},
			gainExp:function(exp_gained){
				exp_gained *= game.bonus;
				exp += exp_gained;
				if(exp >= level * 10){
					levelUp();
				}
				refreshExpBar();
				game.total_exp_gained += exp_gained;
			},
			earnGold:function(gold_earned){
				if(game){
					gold_earned *= game.bonus;
					game.total_gold_earned += gold_earned;
				}
				gold += gold_earned;
				gold_text.text = gold.toFixed(0) + " Gold";
			},
			setGold:function(new_gold){
				gold = new_gold;
				gold_text.text = gold.toFixed(0) + " Gold";
			},
			setShip:function(new_ship){
				console.log(ship, new_ship);
				ship = new_ship;
				renderShip();
			},
			getLevel:function(){
				return level;
			},
			getExp:function(){
				return exp;
			},
			getGold:function(){
				return gold;
			}
		}
	};

	return {
		getInstance:function(user, ship, home, game){
			if(!instance){
				instance = init.call(this, user, ship, home, game);
			}

			return instance;
		}
	}
})();