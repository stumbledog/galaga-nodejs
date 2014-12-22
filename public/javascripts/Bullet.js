function Bullet(firearm, x, y, degree, speed, damage, critical_rate, critical_damage){
	this.firearm = firearm;
	this.x = x;
	this.y = y;
	this.degree = degree;
	this.speed = speed;
	this.damage = damage;
	this.critical_rate = critical_rate;
	this.critical_damage = critical_damage;
	this.bullets = [];

	init.call(this);

	function init(){
		this.shape = new createjs.Shape();
		this.shape.graphics.bf(loader.getResult("items")).drawRect(124,231,10,4);
		this.shape.cache(124,231,10,4);
		this.shape.regX = 129;
		this.shape.regY = 233;
		this.shape.x = x;
		this.shape.y = y;
		this.shape.rotation = degree + 90;
		this.shape.speed = this.speed;
		stage.addChild(this.shape);
	}
}

Bullet.prototype.getDamage = function(){
	var critical = Math.random() <= this.critical_rate;
	return {critical:critical, amount:this.damage * (critical ? this.critical_damage : 1)};
}

Bullet.prototype.hit = function(bullet){
	stage.removeChild(this.shape);
	this.firearm.removeBullet(this);
}

Bullet.prototype.tick = function(){
	this.shape.x -= this.shape.speed * Math.cos(this.shape.rotation/180*Math.PI);
	this.shape.y -= this.shape.speed * Math.sin(this.shape.rotation/180*Math.PI);
	if(this.shape.y < -100 || this.shape.y > 740 || this.shape.x < -100 || this.shape.x > 740){
		stage.removeChild(this.shape);
		delete this;
	}else{
		wave.enermies.forEach(function(enermy){
			if(enermy.status){
				if(enermy.isHit(this.shape)){
					this.hit();
					enermy.damaged(this);
				}
			}
		}, this);
	}
}