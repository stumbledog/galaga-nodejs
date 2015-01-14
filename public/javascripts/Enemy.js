function Enemy(ship){
	this.wave = Wave.getInstance();
	this.ship = ship;
	this.user = User.getInstance();
	this.game = Game.getInstance();
	this.stage = this.game.getStage();
	this.loader = this.game.getLoader();
	this.effect = Effect.getInstance();
	this.slow = this.user.getSlowBullet();
	this.user_ship = Ship.getInstance();

	init.call(this);

	function init(){
		this.health_max = this.health = this.ship.health * this.game.getDifficulty()[1];
		this.ticks = 0;

		this.renderShip();
		this.renderHealthBar();
	}
}

Enemy.prototype.getContainer = function(){
	return this.container;
}

Enemy.prototype.renderShip = function(){
	this.container = new createjs.Container();
	this.container.enemy = this;
	this.container.scaleX = this.container.scaleY = this.ship.scale;
	this.container.addChild(Renderer.renderShip(this.ship.shape, this.loader));
	this.ship.radius = this.ship.shape.width * this.ship.scale / 2;
	/*
	this.ship.components.forEach(function(component){
		this.shape = new createjs.Shape();
		this.shape.graphics.bf(this.loader.getResult(this.ship.file)).dr(component.crop_x, component.crop_y, component.width, component.height);
		this.shape.cache(component.crop_x, component.crop_y, component.width, component.height);
		this.shape.regX = component.crop_x + component.width / 2;
		this.shape.regY = component.crop_y + component.height / 2;
		this.shape.x = component.x;
		this.shape.y = component.y;
		this.container.addChild(this.shape);
	}, this);
*/
	var radian = Math.PI * Math.random() * 2;
	this.container.x = Math.cos(radian) * 500 + 320;
	this.container.y = Math.sin(radian) * 500 + 320;

	this.stage.addChild(this.container);
}

Enemy.prototype.renderHealthBar = function(){
	this.health_bar = new createjs.Shape();
	this.health_bar.graphics.beginFill("#CC0000").drawRect( -this.ship.radius, -this.ship.radius - 15, this.ship.radius * 2, this.ship.radius/5);
	this.container.addChild(this.health_bar);
}

Enemy.prototype.damaged = function(bullet){
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
	this.health_bar.graphics.beginFill("#666666").drawRect(this.ship.radius * 2 / this.health_max * this.health - this.ship.radius, -this.ship.radius - 15, this.ship.radius * 2 * (this.health_max - this.health) / this.health_max, this.ship.radius/5);
	if(this.health <= 0){
		this.destroyed(bullet);
	}

	this.game.addDamageDealt(damage.amount);
}

Enemy.prototype.destroyed = function(bullet){
	var text = new createjs.Text((this.ship.exp * this.game.getBonus()).toFixed(0)+" exp", "12px Arial", "#fff");
	text.x = this.container.x;
	text.y = this.container.y;
	text.textBaseline = "alphabetic";
	this.stage.addChild(text);
	var stage = this.stage;
	createjs.Tween.get(text)
	.to({x:text.x+20, y:text.y-20, alpha:0}, 2000).call(function(item){
		stage.removeChild(item.target);
	});	
	this.user.gainExp(this.ship.exp);
	this.user.earnGold(this.ship.gold);
	this.effect.destroy(this.container.x,this.container.y,this.ship.radius / 20);

	this.game.enemyDestoryed();
	this.wave.enemyDestroyed(this.container);
}

Enemy.prototype.isHit = function(bullet){
	//return (Math.pow(bullet.x - this.container.x, 2) + Math.pow(bullet.y - this.container.y, 2) < Math.pow(this.ship.radius, 2));
	return Math.abs(bullet.x - this.container.x) < this.ship.radius + bullet.radius && Math.abs(bullet.y - this.container.y) < this.ship.radius + bullet.radius;
}

Enemy.prototype.fire = function(){
	for(var i=0;i<this.ship.firearm.shots;i++){
		var shape = new createjs.Shape();
		var crop = this.ship.firearm.shape;
		shape.graphics.bf(this.loader.getResult(this.ship.firearm.shape.file)).drawRect(crop.crop_x,crop.crop_y,crop.width,crop.height);
		//shape.cache(crop.crop_x,crop.crop_y,crop.width,crop.height);
		shape.regX = crop.crop_x + crop.width/2;
		shape.regY = crop.crop_y + crop.height/2;
		shape.rotation = this.container.rotation - 90 + 180 * (Math.random()-0.5) * (100 - this.ship.firearm.accuracy) / 100;
		shape.radian = Math.PI * (shape.rotation) / 180;
		shape.x = this.container.x;
		shape.y = this.container.y;
		shape.damage = this.ship.firearm.damage * this.game.getDifficulty()[2];
		shape.radius = this.ship.firearm.shape.height / 2 * (1 + (this.game.getDifficulty()[4]-1) / 10);
		shape.scaleX = shape.scaleY = 1 + (this.game.getDifficulty()[4]-1)/10;
		shape.speed = this.ship.firearm.speed;
		this.wave.addBullet(shape);		
	}
}

Enemy.prototype.tick = function(){
	var dx = this.user_ship.getContainer().x - this.container.x;
	var dy = this.user_ship.getContainer().y - this.container.y;
	var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;
	var radian = Math.PI*(degree-90)/180;
	this.container.rotation = degree;
	this.health_bar.rotation = -degree;
	var distance = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
	if(distance > this.ship.range || this.container.x < 0 || this.container.x > 640 || this.container.y < 0 || this.container.y > 640){
		this.container.x += this.ship.speed * Math.cos(radian);
		this.container.y += this.ship.speed * Math.sin(radian);
	}else if(this.ticks > this.ship.firearm.firerate / (1 + (this.game.getDifficulty()[3]-1)/10)){
		if(createjs.Ticker.getMeasuredFPS()>25){
			this.fire();
		}else{
			this.wave.getCurrentBullets().forEach(function(bullet){
				bullet.speed = 10;
			});
		}
		this.ticks = 0;
	}
	this.ticks++;
}
