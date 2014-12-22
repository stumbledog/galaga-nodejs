function NewEnermy(property){
	var ALIVE = true;
	var DESTROYED = false;
	var NORMAL = 1;

	this.stats = property;

	init.call(this);

	function init(){
		this.bullets = [];
		this.health = this.stats.health;
		this.health_max = this.stats.health;
		this.status = true;
		this.ticks = 0;

		this.renderShip();
		this.renderHealthBar();
	}
}

NewEnermy.prototype.renderShip = function(){
	this.container = new createjs.Container();
	this.stats.components.forEach(function(component){
		var shape = new createjs.Shape();
		shape.graphics.bf(loader.getResult("components")).dr(component.crop_x, component.crop_y, component.width, component.height);
		shape.regX = component.crop_x + component.width / 2;
		shape.regY = component.crop_y + component.height / 2;
		shape.x = component.x;
		shape.y = component.y;
		this.container.addChild(shape);
	}, this);
	this.container.x = Math.random()*640;
	this.container.y = Math.random()*640;
	stage.addChild(this.container);
}

NewEnermy.prototype.renderHealthBar = function(){
	this.health_bar = new createjs.Shape();
	this.health_bar.graphics.beginFill("#CC0000").drawRect( -this.stats.width/2, -this.stats.height / 2 - 15, this.stats.width, this.stats.width/10);	
	this.container.addChild(this.health_bar);
}

NewEnermy.prototype.damaged = function(bullet){
	var damage = bullet.getDamage();
	this.health -= damage.amount;
	var font_size = damage.critical?"16":"12";
	var text = new createjs.Text(damage.amount, font_size+"px Arial", damage.critical?"#F6D605":"#F5F4FE");
	text.x = this.container.x;
	text.y = this.container.y;
	text.textBaseline = "alphabetic";
	stage.addChild(text);
	createjs.Tween.get(text)
	.to({x:text.x-10, y:text.y-20, alpha:0}, 1000).call(function(item){
		stage.removeChild(item.target);
	});
	this.health_bar.graphics.beginFill("#666666").drawRect(this.stats.width / this.health_max * this.health - this.stats.width/2, -this.stats.height/2 - 15, this.stats.width * (this.health_max - this.health) / this.health_max, this.stats.width/10);
	if(this.health <= 0){
		this.destroyed(bullet);
	}
}

NewEnermy.prototype.destroyed = function(bullet){
	this.status = false;
	stage.removeChild(this.container);
	stage.removeChild(this.health_bar);
}

NewEnermy.prototype.isHit = function(bullet){
	return (bullet.x >= this.container.x - this.stats.width / 2 && bullet.x <= this.container.x + this.stats.width / 2
		&& bullet.y >= this.container.y - this.stats.height / 2 && bullet.y <= this.container.y + this.stats.height/2);
}

NewEnermy.prototype.fire = function(){
	var shape = new createjs.Shape();
	shape.graphics.bf(loader.getResult("items")).drawRect(124,231,10,4);
	shape.cache(124,231,10,4);
	shape.regX = 129;
	shape.regY = 233;
	shape.rotation = this.container.rotation - 90;
	shape.radian = Math.PI*(shape.rotation)/180;
	shape.x = this.container.x;
	shape.y = this.container.y;
	this.bullets.push(shape);
	stage.addChild(shape);
}

NewEnermy.prototype.tick = function(){
	if(this.status){
		var dx = ship.container.x - this.container.x;
		var dy = ship.container.y - this.container.y;
		var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;
		var radian = Math.PI*(degree-90)/180;
		this.container.rotation = degree;
		this.health_bar.rotation = -degree;
		var distance = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
		if(distance > this.stats.range){
			this.container.x += this.stats.speed * Math.cos(radian);
			this.container.y += this.stats.speed * Math.sin(radian);
		}

		if(this.ticks > this.stats.firearm.firerate){
			this.fire();
			this.ticks = 0;
		}
		this.ticks++;
	}

	var visible_bullets = [];
	this.bullets.forEach(function(bullet){
		if(bullet.x < -100 || bullet.x > 740 || bullet.y < -100 || bullet.y > 740){
			stage.removeChild(bullet);
			delete bullet;
		}else{
			bullet.x += this.stats.firearm.speed * Math.cos(bullet.radian);
			bullet.y += this.stats.firearm.speed * Math.sin(bullet.radian);
			visible_bullets.push(bullet);
		}
	}, this);

	this.bullets = visible_bullets;
}