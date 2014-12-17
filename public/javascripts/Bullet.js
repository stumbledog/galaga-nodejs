function Bullet(stage, loader, damage){
    this.stage = stage;
    this.damage = damage;
    var self = this;
    var shape;
    var bullets = [];

    init(loader);

    function init(loader){
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
        return this.damage;
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

    this.spawn = function(x, y, speed, degree){
        var bullet_clone = shape.clone();
        bullet_clone.x = x;
        bullet_clone.y = y;
        bullet_clone.rotation = degree + 90;
        bullet_clone.speed = speed;
        bullets.push(bullet_clone);
        this.stage.addChild(bullet_clone);
    }

    this.setStage = function(newStage){
        stage = newStage;
    }

    this.tick = function(stage){
        if(bullets.length){
            var visible_bullets = [];
            bullets.forEach(function(bullet){

                bullet.x -= bullet.speed * Math.cos(bullet.rotation/180*Math.PI);
                bullet.y -= bullet.speed * Math.sin(bullet.rotation/180*Math.PI);
                if(bullet.y<0 || bullet.y>640 || bullet.x<0 || bullet.x>640){
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
