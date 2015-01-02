function User(user){
	this.level = user.level;
	console.log(user);
	this.exp_cap = user.level * 10;
	this.exp = user.exp;
	this.gold = user.gold;
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
	this.gold_text.textAlign = "right";
	this.gold_text.textBaseline = "bottom";
	this.gold_text.x = this.gold_text.y = 620
	stage.addChild(this.gold_text);
}

User.prototype.renderLevel = function(){
	this.level_text = new createjs.Text(this.level + " Level", "12px Arial", "#FFFFFF");
	this.level_text.textAlign = "right";
	this.level_text.textBaseline = "bottom";
	this.level_text.x = 620;
	this.level_text.y = 606;
	stage.addChild(this.level_text);	
}