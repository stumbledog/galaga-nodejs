function Firearm(speed, firerate, damage, critical_rate, critical_damage){
    this.firerate = firerate;

    var bullet;
    var ticks = 0;

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

    this.getBulletShape = function(){
        return bullet.getBulletShape();
    }

    this.getBullets = function(){
        return bullet;
    }

    this.tick = function(){
        ticks++;
        bullet.tick();
    }
}
