function Firearm(data, upgrade){
    this.accuracy = data.accuracy + upgrade.accuracy.value > 100 ? 100 : data.accuracy + upgrade.accuracy.value;
    this.firerate = data.firerate + upgrade.firerate.value < 1 ? 1 : data.firerate + upgrade.firerate.value;
    this.bullet = data.bullet;
    this.upgrade = upgrade;
    this.bullets = [];
    this.ticks = 0;
}

Firearm.prototype.removeBullet = function(target){
    this.bullets = this.bullets.filter(function(bullet){
        return bullet !== target;
    });
}

Firearm.prototype.fire = function(x, y, degree){
    if(this.ticks >= this.firerate){
        degree += 180 * (Math.random()-0.5) * (100 - this.accuracy) / 100;
        var bullet = new Bullet(this, x, y, degree, this.bullet, this.upgrade);
        this.bullets.push(bullet);
        this.ticks = 0;
    }
}

Firearm.prototype.tick = function(){
    this.bullets.forEach(function(bullet){
        bullet.tick();
    });
    this.ticks++;
}