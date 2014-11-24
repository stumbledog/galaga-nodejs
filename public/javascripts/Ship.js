function Ship(stage, image_loader, width, height){
  var VERTICAL_SPEED = HORIZONTAL_SPEED = 5;
  var ship, firearm;
  var move_right = move_left = move_up = move_down = trigger = false;
  var counter = 0;
  init(image_loader, width, height);

  function init(image_loader, width, height){
    firearm = new Firearm(stage, image_loader, 10, 1, 15, 20);
    ship = new createjs.Shape();
    ship.graphics.bf(image_loader.getResult("components")).drawRect(58,113,14,28);
    ship.regX = 65;
    ship.regY = 127;
    ship.x = width/2;
    ship.y = height + 100;
    ship.width = 14;
    ship.height = 28;
    stage.addChild(ship);
  }

  this.getShape = function(){
    return ship;
  }

  this.initEventHandler = function(){
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
  }

  function handleKeyDown(event) {
    switch(event.keyCode) {
      case 87:
        move_up = true;
        break;
      case 68:
        move_right = true;
        break;
      case 83:
        move_down = true;
        break;
      case 65:
        move_left = true;
        break;
      case 32:
        trigger = true;
        break;
    }
  }

  function handleKeyUp(event) {
    switch(event.keyCode) {
      case 87:
        move_up = false;
        break;
      case 83:
        move_down = false;
        break;
      case 68:
        move_right = false;
        break;
      case 65:
        move_left = false;
        break;
      case 32:
        trigger = false;
        break;
    }
  }

  this.tick = function(stage) {
    counter++;
    if(move_up && ship.y > 100){
      ship.y -= VERTICAL_SPEED;
    }else if(move_down && ship.y < stage.canvas.height - ship.height){
      ship.y += VERTICAL_SPEED;
    }

    if(move_right && ship.x < stage.canvas.width - ship.width){
      ship.x += VERTICAL_SPEED;
    }else if(move_left && ship.x >= ship.width){
      ship.x -= VERTICAL_SPEED;
    }

    if(trigger && counter >= firearm.getFireRate()){
      firearm.fire(ship.x, ship.y - ship.height);
      counter = 0;
    }
    firearm.tick(stage);


    /*
    var bullets = stage.children.filter(function(child){
      return child.type === BULLET;
    });

    bullets.forEach(function(bullet){
      bullet.y -= 18;
      if(bullet.y < 0){
        stage.removeChild(bullet);
      }
    });

    if(launch) {
      if(bullets.length < MAX_BULLET){
        var bullet = new createjs.Shape();
        bullet.graphics.bf(loader.getResult("items")).drawRect(124,231,10,4);
        bullet.cache(124,231,10,4);
        bullet.regX = 129;
        bullet.regY = 233;
        bullet.x = ship.x;
        bullet.y = ship.y - ship.height;
        bullet.type = BULLET;
        bullet.rotation = 90;
        stage.addChild(bullet);
      }
    }
    */
  }
};
