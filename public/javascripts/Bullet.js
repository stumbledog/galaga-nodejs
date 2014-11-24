function Bullet(stage, loader){
  this.stage = stage;
  var shape;
  var bullets = [];

  init(loader);

  function init(loader){
    shape = new createjs.Shape();
    shape.graphics.bf(loader.getResult("items")).drawRect(124,231,10,4);
//    shape.cache(0,0,0,0);
    shape.cache(124,231,10,4);
    shape.regX = 129;
    shape.regY = 233;
    shape.rotation = 90;
  }

  this.spawn = function(x, y, speed){
    var bullet_clone = shape.clone();
    bullet_clone.x = x;
    bullet_clone.y = y;
    bullet_clone.speed = speed;
    bullets.push(bullet_clone);
    this.stage.addChild(bullet_clone);
  }

  this.setStage = function(newStage){
    stage = newStage;
  }

  this.tick = function(stage){
    if(bullets.length){
      bullets.forEach(function(bullet){
        bullet.y -= bullet.speed;
        if(bullet.y<0){
          bullet.remove = true;
          stage.removeChild(bullet);
        }
      });

      bullets = bullets.filter(function(bullet){
        return !bullet.remove;
      });
    }
  }
}
