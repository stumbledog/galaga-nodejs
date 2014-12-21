function Bullet(speed, damage, critical_rate, critical_damage){
	this.speed = speed;
	this.damage = damage;
	this.critical_rate = critical_rate;
	this.critical_damage = critical_damage;

	var self = this;
	var shape;
	var bullets = [];

    init();

    function init(){
        createjs.Shape.prototype.getbullet = function(){
            return self;
        }
        shape = new createjs.Shape();
        shape.graphics.bf(loader.getResult("items")).drawRect(124,231,10,4);
        //shape.cache(0,0,0,0);
        shape.cache(124,231,10,4);
        shape.regX = 129;
        shape.regY = 233;
        //shape.rotation = 90;
    }

    this.getDamage = function(){
        if(Math.random() <= critical_rate){
            return {critical:true, amount:this.damage * this.critical_damage};
        }
        return {critical:false, amount:this.damage};
    }

    this.getBulletShape = function(){
        return bullets;
    }

    this.hit = function(bullet){
        var index = bullets.indexOf(bullet);
        bullets.splice(index, 1);
        stage.removeChild(bullet);
        delete bullet;
    }

    this.spawn = function(x, y, degree){
        var bullet_clone = shape.clone();
        bullet_clone.x = x;
        bullet_clone.y = y;
        bullet_clone.rotation = degree + 90;
        bullet_clone.speed = this.speed;
        bullets.push(bullet_clone);
        stage.addChild(bullet_clone);
    }

    this.setStage = function(newStage){
        stage = newStage;
    }

    this.tick = function(){
        if(bullets.length){
            var visible_bullets = [];
            bullets.forEach(function(bullet){
                bullet.x -= bullet.speed * Math.cos(bullet.rotation/180*Math.PI);
                bullet.y -= bullet.speed * Math.sin(bullet.rotation/180*Math.PI);
                if(bullet.y < -20 || bullet.y > 660 || bullet.x < -20 || bullet.x > 660){
                    stage.removeChild(bullet);
                    delete bullet;
                }else{
                    visible_bullets.push(bullet);
                }
            });
            bullets = visible_bullets;
        }
    }
}
