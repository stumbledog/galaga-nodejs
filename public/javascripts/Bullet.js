function Bullet(x, y, degree, speed, damage, critical_rate, critical_damage){
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
    /*
    this.getDamage = function(){
        if(Math.random() <= critical_rate){
            return {critical:true, amount:this.damage * this.critical_damage};
        }
        return {critical:false, amount:this.damage};
    }*/
}


/*
Bullet.prototype.spawn = function(x, y, degree){
	var bullet_clone = this.shape.clone();
	bullet_clone.x = x;
	bullet_clone.y = y;
	bullet_clone.rotation = degree + 90;
	bullet_clone.speed = this.speed;
	this.bullets.push(bullet_clone);
	stage.addChild(bullet_clone);
}
*/
Bullet.prototype.getDamage = function(){
	return {critical:true, amount:this.damage * ((Math.random() <= this.critical_rate) ? this.critical_damage : 1)};
	/*
	if(Math.random() <= critical_rate){
		return {critical:true, amount:this.damage * this.critical_damage};
	}
	return {critical:false, amount:this.damage};*/
}

Bullet.prototype.hit = function(bullet){
	var index = this.bullets.indexOf(bullet);
	this.bullets.splice(index, 1);
	stage.removeChild(bullet);
	delete bullet;
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
					enermy.damaged(this);
				}				
			}
		}, this);
		//visible_bullets.push(bullet);
	}
		/*	
	var visible_bullets = [];

	this.bullets.forEach(function(bullet){
		bullet.x -= bullet.speed * Math.cos(bullet.rotation/180*Math.PI);
		bullet.y -= bullet.speed * Math.sin(bullet.rotation/180*Math.PI);
		if(bullet.y < -100 || bullet.y > 740 || bullet.x < -100 || bullet.x > 740){
			stage.removeChild(bullet);
			delete bullet;
		}else{
			wave.enermies.forEach(function(enermy){
				if(enermy.isHit(bullet)){
					enermy.damaged(bullet);
				}
			}, this);
			visible_bullets.push(bullet);
		}
	});
	bullets = visible_bullets;*/
}