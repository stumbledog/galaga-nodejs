function Firearm(speed, firerate, damage, critical_rate, critical_damage){

    this.speed = speed;
    this.firerate = firerate;
    this.damage = damage;
    this.critical_rate = critical_rate;
    this.critical_damage = critical_damage;

    this.bullets = [];
    this.ticks = 0;

    /*

    init(speed, damage, critical_rate, critical_damage);

    function init(speed, damage, critical_rate, critical_damage){
        bullet = new Bullet(speed, damage, critical_rate, critical_damage);
    }

    this.fire = function(x, y, degree){
        if(ticks >= this.firerate){
            ticks = 0;

            bullet.spawn(x, y, degree);
        }
    }

    this.getFireRate = function(){
        return this.fire_rate;
    }

    this.getBullets = function(){
        return bullet;
    }

    this.tick = function(){
        ticks++;
        bullet.tick();
    }*/
}

Firearm.prototype.fire = function(x, y, degree){
    if(this.ticks >= this.firerate){
        var bullet = new Bullet(x, y, degree, this.speed, this.damage, this.critical_rate, this.critical_damage);
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
