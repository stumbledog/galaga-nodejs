function Firearm(stage, image_loader, speed, firerate, damage, critical_rate, critical_damage){
    this.firerate = firerate;

    var bullet;
    var ticks = 0;

    init(stage, image_loader, speed, damage, critical_rate, critical_damage);

    function init(stage, image_loader, speed, damage, critical_rate, critical_damage){
        bullet = new Bullet(stage, image_loader, speed, damage, critical_rate, critical_damage);
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

    this.tick = function(stage){
        ticks++;
        bullet.tick(stage);
    }
}
