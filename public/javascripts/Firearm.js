function Firearm(speed, firerate, damage, critical_rate, critical_damage){

    this.speed = speed;
    this.firerate = firerate;
    this.damage = damage;
    this.critical_rate = critical_rate;
    this.critical_damage = critical_damage;
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
        var bullet = new Bullet(this, x, y, degree, this.speed, this.damage, this.critical_rate, this.critical_damage);
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