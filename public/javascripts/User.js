function User(user){

	this.level = user.level;
	console.log(user);
	this.exp_cap = user.level * 10;
	this.exp = user.exp;
	this.gold = user.gold;


	init.call(this);

	function init(){

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
}

User.prototype.levelUp = function(){
	this.exp -= this.level * 10;
	this.level++;
	this.exp_cap = this.level * 10;
	ship.level_up_text.visible = true;
	ship.health = ship.health_max;	
	createjs.Tween.get(ship.level_up_text)
	.to({scaleX:-1}, 500).to({scaleX:1}, 500).wait(1000).call(function(){
		ship.level_up_text.visible = false;
	},[],this);
	ship.damage_bar.graphics.c().beginFill("#CC0000").drawRect(ship.ship._shape.radius * 2 / ship.health_max * ship.health - ship.ship._shape.radius, -ship.ship._shape.radius * 2, ship.ship._shape.radius * 2 * (ship.health_max - ship.health) / ship.health_max, ship.ship._shape.radius / 5);
	if(this.exp >= this.level * 10){
		this.levelUp();
	}
}