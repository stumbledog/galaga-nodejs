function Firearm(data, upgrade){
    this.accuracy = data.accuracy + upgrade.accuracy.value > 100 ? 100 : data.accuracy + upgrade.accuracy.value;
    this.firerate = data.firerate + upgrade.firerate.value < 1 ? 1 : data.firerate + upgrade.firerate.value;
    this.shots = data.shots;
    this.bullet = data.bullet;
    this.radius = this.bullet.shape.height / 2;
    this.upgrade = upgrade;
    this.bullets = [];
    this.ticks = 0;
    this.double_shot = User.getInstance().getMultiShot();
    this.increase_damage = 1 + User.getInstance().getIncreaseDamage() / 10;
}

Firearm.prototype.removeBullet = function(target){
    this.bullets = this.bullets.filter(function(bullet){
        return bullet !== target;
    });
}

Firearm.prototype.fire = function(x, y, degree){
    if(this.ticks >= this.firerate){
        //var index = -(this.double_shot + 1) * this.shots * (this.radius + 1)/2;
        for(var i = 0; i < (this.double_shot + 1) * this.shots;i++){
            var offsetX = Math.sin(degree/180*Math.PI);//*index;
            var offsetY = Math.cos(degree/180*Math.PI);//*index;
            var bullet_degree = degree + 180 * (Math.random()-0.5) * (100 - this.accuracy) / 100;
            var bullet = new Bullet(this, x + offsetY, y + offsetX, bullet_degree, this.bullet, this.upgrade, this.increase_damage);
            this.bullets.push(bullet);
            //index+=(this.radius + 1);
        }
        this.ticks = 0;
    }
}

Firearm.prototype.tick = function(){
    this.bullets.forEach(function(bullet){
        bullet.tick();
    });
    this.ticks++;
}