function Enermy(property){
	this.wave = Wave.getInstance();
	this.stats = property;
	this.user = User.getInstance();
	this.game = Game.getInstance();
	this.stage = this.game.getStage();
	this.loader = this.game.getLoader();
	this.effect = Effect.getInstance();

	init.call(this);

	function init(){
		this.bullets = [];
		this.health_max = this.health = this.stats.health * this.game.getDifficulty()[1];
		this.status = true;
		this.ticks = 0;

		this.renderShip();
		this.renderHealthBar();
	}
}

Enermy.prototype.renderShip = function(){
	this.container = new createjs.Container();
	this.stats.components.forEach(function(component){
		this.shape = new createjs.Shape();
		this.shape.graphics.bf(this.loader.getResult(this.stats.file)).dr(component.crop_x, component.crop_y, component.width, component.height);
		this.shape.regX = component.crop_x + component.width / 2;
		this.shape.regY = component.crop_y + component.height / 2;
		this.shape.x = component.x;
		this.shape.y = component.y;
		this.container.addChild(this.shape);
	}, this);

	var radian = Math.PI * Math.random() * 2;
	this.container.x = Math.cos(radian) * 500 + 320;
	this.container.y = Math.sin(radian) * 500 + 320;

	this.stage.addChild(this.container);
}

Enermy.prototype.renderHealthBar = function(){
	this.health_bar = new createjs.Shape();
	this.health_bar.graphics.beginFill("#CC0000").drawRect( -this.stats.width/2, -this.stats.height / 2 - 15, this.stats.width, this.stats.width/10);	
	this.container.addChild(this.health_bar);
}

Enermy.prototype.damaged = function(bullet){
	var damage = bullet.getDamage();
	this.health -= damage.amount;
	var font_size = damage.critical?"16":"12";
	var text = new createjs.Text(Math.round(damage.amount), font_size+"px Arial", damage.critical?"#F6D605":"#F5F4FE");
	text.x = this.container.x;
	text.y = this.container.y;
	text.textBaseline = "alphabetic";
	this.stage.addChild(text);
	var stage = this.stage
	createjs.Tween.get(text)
	.to({x:text.x-20, y:text.y-20, alpha:0}, 2000).call(function(item){
		stage.removeChild(item.target);
	});
	this.health_bar.graphics.beginFill("#666666").drawRect(this.stats.width / this.health_max * this.health - this.stats.width/2, -this.stats.height/2 - 15, this.stats.width * (this.health_max - this.health) / this.health_max, this.stats.width/10);
	if(this.health <= 0){
		this.destroyed(bullet);
	}

	this.game.addDamageDealt(damage.amount);
}

Enermy.prototype.destroyed = function(bullet){
	this.status = false;
	var text = new createjs.Text((this.stats.exp * this.game.getBonus()).toFixed(0)+" exp", "12px Arial", "#fff");
	text.x = this.container.x;
	text.y = this.container.y;
	text.textBaseline = "alphabetic";
	this.stage.addChild(text);
	var stage = this.stage;
	createjs.Tween.get(text)
	.to({x:text.x+20, y:text.y-20, alpha:0}, 2000).call(function(item){
		stage.removeChild(item.target);
	});	
	this.user.gainExp(this.stats.exp);
	this.user.earnGold(this.stats.gold);
	this.effect.destroy(bullet.shape.x,bullet.shape.y,this.stats.radius / 20);
	this.stage.removeChild(this.container);
	this.stage.removeChild(this.health_bar);

	this.game.enermyDestoryed();
	this.wave.enermyDestroyed();
}

Enermy.prototype.isHit = function(bullet){
	//return (Math.pow(bullet.x - this.container.x, 2) + Math.pow(bullet.y - this.container.y, 2) < Math.pow(this.stats.radius, 2));
	return Math.abs(bullet.x - this.container.x) < this.stats.radius + bullet.radius && Math.abs(bullet.y - this.container.y) < this.stats.radius + bullet.radius;
}

Enermy.prototype.fire = function(){
	var shape = new createjs.Shape();
	shape.graphics.bf(this.loader.getResult("items")).drawRect(124,231,10,4);
	shape.cache(124,231,10,4);
	shape.regX = 129;
	shape.regY = 233;
	shape.rotation = this.container.rotation - 90 + 180 * (Math.random()-0.5) * (100 - this.stats.firearm.accuracy) / 100;
	shape.radian = Math.PI * (shape.rotation) / 180;
	shape.x = this.container.x;
	shape.y = this.container.y;
	shape.damage = this.stats.firearm.damage * this.game.getDifficulty()[2];
	shape.radius = this.stats.firearm.radius;
	this.bullets.push(shape);
	this.stage.addChild(shape);
}

Enermy.prototype.tick = function(){
	var ship = Ship.getInstance();
	if(this.status){
		var dx = ship.getContainer().x - this.container.x;
		var dy = ship.getContainer().y - this.container.y;
		var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;
		var radian = Math.PI*(degree-90)/180;
		this.container.rotation = degree;
		this.health_bar.rotation = -degree;
		var distance = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
		if(distance > this.stats.range || this.container.x < this.stats.radius * 2 || this.container.x > 640 - this.stats.radius * 2 || this.container.y < this.stats.radius * 2 || this.container.y > 640 - this.stats.radius * 2){
			this.container.x += this.stats.speed * Math.cos(radian);
			this.container.y += this.stats.speed * Math.sin(radian);
		}else if(this.ticks > this.stats.firearm.firerate / this.game.getDifficulty()[3]){
			this.fire();
			this.ticks = 0;
		}
		this.ticks++;
	}

	var visible_bullets = [];
	this.bullets.forEach(function(bullet){
		if(bullet.x < -100 || bullet.x > 740 || bullet.y < -100 || bullet.y > 740){
			this.stage.removeChild(bullet);
		}else{
			if(ship.isHit(bullet)){
				ship.damaged(bullet);
				this.effect.hit(bullet.x, bullet.y);
				this.stage.removeChild(bullet);
			}else{
				bullet.x += this.stats.firearm.speed * Math.cos(bullet.radian) * this.game.getDifficulty()[4];
				bullet.y += this.stats.firearm.speed * Math.sin(bullet.radian) * this.game.getDifficulty()[4];
				visible_bullets.push(bullet);
			}
		}
	}, this);

	this.bullets = visible_bullets;
}