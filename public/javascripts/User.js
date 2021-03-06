var User = (function(){

	var instance;

	function init(user, ship, type){
		var level = user.level;
		var exp = user.exp;
		var exp_cap = user.level * 100;
		var gold = user.gold;
		var type = type;
		var gold_text, level_text;

		var shape_container = new createjs.Container();

		if(type === "home"){
			var stage = Home.getInstance().getStage();
			var loader = Home.getInstance().getLoader();
		}else if(type === "game"){
			var stage = Game.getInstance().getStage();
			var loader = Game.getInstance().getLoader();
		}

		render();

		function render(){
			renderGold();
			renderLevel();
			initShip();
		}

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
			shape_container.addChild(Renderer.renderShip(ship.shape, loader));
			shape_container.scaleX = shape_container.scaleY = Math.sqrt(ship.shape.height*ship.shape.width) < 64? 1 : 64/Math.sqrt(ship.shape.height*ship.shape.width);
			stage.update();
		}

		function levelUp(){
			exp -= level * 100;
			level++;
			level_text.text = level + " Level";
			exp_cap = level * 100;
			Ship.getInstance().levelUp();
			if(exp >= level * 100){
				levelUp();
			}
		}

		return{
			gainExp:function(exp_gained){
				var game = Game.getInstance();
				exp_gained *= game.getBonus();
				game.addExp(exp_gained);
				exp += exp_gained;
				if(exp >= level * 100){
					levelUp();
				}
				ShipStats.getInstance().renderExpBar(level, exp, exp_cap);
			},
			earnGold:function(gold_earned){
				var game = Game.getInstance();
				gold_earned *= game.getBonus();
				game.addGold(gold_earned);
				gold += gold_earned;
				gold_text.text = gold.toFixed(0) + " Gold";
			},
			setGold:function(new_gold){
				gold = new_gold;
				gold_text.text = gold.toFixed(0) + " Gold";
			},
			setShip:function(new_ship){
				ship = new_ship;
				renderShip();
			},
			getLevel:function(){
				return level;
			},
			getExp:function(){
				return exp;
			},
			getExpCap:function(){
				return exp_cap;
			},
			getGold:function(){
				return gold;
			},
			getShip:function(){
				return ship;
			},
			getMultiShot:function(){
				return user.mastery.multi_shot.point;
			},
			getSlowBullet:function(){
				return user.mastery.slow_bullet.point;
			},
			getReduceSize:function(){
				return user.mastery.reduce_size.point;
			},
			getIncreaseDamage:function(){
				return user.mastery.increase_damage.point;
			},
			getIncreaseHealth:function(){
				return user.mastery.increase_health.point;
			},
			getIncreaseSpeed:function(){
				return user.mastery.increase_speed.point;
			},
			getIncreaseAccuracy:function(){
				return user.mastery.increase_accuracy.point;
			},
			getDecreaseAccuracy:function(){
				return user.mastery.decrease_accuracy.point;
			},setMastery:function(mastery){
				user.mastery = mastery;
			}
		}
	};

	return {
		getInstance:function(user, ship, type){
			if(!instance){
				instance = init.call(this, user, ship, type);
			}

			return instance;
		}
	}
})();