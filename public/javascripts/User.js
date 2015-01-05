var User = (function(){

	var instance;

	function init(user, home, game){
		var level = user.level;
		var exp = user.exp;
		var exp_cap = user.level * 10;
		var gold = user.gold;
		var selected_ship = user._selected_ship;
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
			selected_ship._shape.components.forEach(function(component){
				var shape = new createjs.Shape();
				shape.graphics.bf(loader.getResult(selected_ship._shape.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
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
		getInstance:function(user, home, game){
			if(!instance){
				instance = init.call(this, user, home, game);
			}

			return instance;
		}
	}
})();
/*
function User(user){
	console.log(user);
	this.level = user.level;
	this.exp_cap = user.level * 10;
	this.exp = user.exp;
	this.gold = user.gold;
	this.ship = user._selected_ship;

	init.call(this);

	function init(){
		this.shape_container = new createjs.Container();
		stage.addChild(this.shape_container);		
	}
}

User.prototype.getExp = function(exp){
	exp *= game.bonus;
	this.exp += exp;
	game.total_exp_gained += exp;
	if(this.exp >= this.level * 10){
		this.levelUp();
	}
	ship_stats.renderExpBar();
}

User.prototype.getGold = function(gold){
	gold *= game.bonus;
	this.gold += gold;
	game.total_gold_earned += gold;
	this.gold_text.text = this.gold.toFixed(0) + " Gold";
}

User.prototype.setGold = function(gold){
	this.gold = gold;
	this.gold_text.text = this.gold.toFixed(0) + " Gold";
}

User.prototype.levelUp = function(){
	this.exp -= this.level * 10;
	this.level++;
	this.exp_cap = this.level * 10;
	ship.level_up_text.visible = true;
	ship.health = ship.health_max;	
	ship.psychic = ship.psychic_max;
	createjs.Tween.get(ship.level_up_text)
	.to({scaleX:-1}, 500).to({scaleX:1}, 500).wait(1000).call(function(){
		ship.level_up_text.visible = false;
	},[],this);
	ship.damage_bar.graphics.c().beginFill("#CC0000").drawRect(ship.ship._shape.radius * 2 / ship.health_max * ship.health - ship.ship._shape.radius, -ship.ship._shape.radius * 2, ship.ship._shape.radius * 2 * (ship.health_max - ship.health) / ship.health_max, ship.ship._shape.radius / 5);
	ship_stats.renderHealthBar();
	if(this.exp >= this.level * 10){
		this.levelUp();
	}
}

User.prototype.renderGold = function(){
	this.gold_text = new createjs.Text(this.gold.toFixed(0) + " Gold", "12px Arial", "#FFBE2C");
	this.gold_text.x = 20;
	this.gold_text.y = 614;
	stage.addChild(this.gold_text);
}

User.prototype.renderLevel = function(){
	this.level_text = new createjs.Text(this.level + " Level", "12px Arial", "#FFFFFF");
	this.level_text.x = 20;
	this.level_text.y = 600;
	stage.addChild(this.level_text);	
}

User.prototype.renderShip = function(){
	this.shape_container.removeAllChildren();
	this.ship._shape.components.forEach(function(component){
		var shape = new createjs.Shape();
		shape.graphics.bf(loader.getResult(this.ship._shape.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
		shape.regX = component.crop_x + component.width / 2;
		shape.regY = component.crop_y + component.height / 2;
		shape.x = component.x;
		shape.y = component.y;
		this.shape_container.addChild(shape);
	}, this);
	this.shape_container.x = 40;
	this.shape_container.y = 570;
}

User.prototype.setUser = function(user){
	this.level = user.level;
	this.exp_cap = user.level * 10;
	this.exp = user.exp;
	this.setGold(user.gold);
	this.ship = user._selected_ship;
	this.renderShip();
}
*/