function Bullet(firearm, x, y, degree, data, upgrade){
	this.firearm = firearm;
	this.x = x;
	this.y = y;
	this.degree = degree;
	this.speed = data.speed;
	this.radius = data.radius;
	this.damage = data.damage + upgrade.damage.value;
	this.critical_rate = data.critical_rate + upgrade.critical_rate.value;
	this.critical_damage = data.critical_damage + upgrade.critical_damage.value;
	
	this.crop_x = data.shape.crop_x;
	this.crop_y = data.shape.crop_y;
	this.width = data.shape.width;
	this.height = data.shape.height;

	this.game = Game.getInstance();
	this.stage = this.game.getStage();
	this.loader = this.game.getLoader();
	this.effect = Effect.getInstance();
	this.wave = Wave.getInstance();

	init.call(this);

	function init(){
		this.shape = new createjs.Shape();
		this.shape.graphics.bf(this.loader.getResult("items")).drawRect(this.crop_x,this.crop_y,this.width,this.height);
		this.shape.cache(this.crop_x,this.crop_y,this.width,this.height);
		this.shape.regX = this.crop_x + this.width/2;
		this.shape.regY = this.crop_y + this.height/2;
		this.shape.x = x;
		this.shape.y = y;
		this.shape.rotation = degree + 90;
		this.shape.speed = this.speed;
		this.shape.radius = this.radius;
		this.stage.addChild(this.shape);
	}
}

Bullet.prototype.getDamage = function(){
	var critical = Math.random() <= this.critical_rate;
	return {critical:critical, amount:this.damage * (critical ? this.critical_damage : 1)};
}

Bullet.prototype.hit = function(){
	this.effect.hit(this.shape.x, this.shape.y, true);
	this.stage.removeChild(this.shape);
	this.firearm.removeBullet(this);
}

Bullet.prototype.tick = function(){
	this.shape.x -= this.shape.speed * Math.cos(this.shape.rotation/180*Math.PI);
	this.shape.y -= this.shape.speed * Math.sin(this.shape.rotation/180*Math.PI);
	if(this.shape.y < -100 || this.shape.y > 740 || this.shape.x < -100 || this.shape.x > 740){
		this.stage.removeChild(this.shape);
		this.firearm.removeBullet(this);
	}else{
		this.wave.getEnemies().forEach(function(enemy_shape){
			var enemy = enemy_shape.enemy;
			if(enemy.isHit(this.shape)){
				this.hit();
				enemy.damaged(this);
			}
		}, this);
	}
}