function Firearm(stage, image_loader, magazine_size, reload_speed, bullet_speed,
    fire_rate, damage){
    this.remaining_bullet = this.margazine = magazine_size;
    this.reload_speed = reload_speed;
    this.bullet_speed = bullet_speed;
    this.fire_rate = fire_rate;

    var bullet;

    init(stage, image_loader, damage);

    function init(stage, image_loader, damage){
        bullet = new Bullet(stage, image_loader, damage);
    }

    this.fire = function(x, y){
        bullet.spawn(x, y, this.bullet_speed);
        /*
        if(remaining_bullet > 0){
          bullet.spawn(x,y,this.bullet_speed);
        }else{

        }*/
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
        bullet.tick(stage);
    }
}
