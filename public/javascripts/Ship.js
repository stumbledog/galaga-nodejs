function Ship(stage, image_loader, width, height){
  var VERTICAL_SPEED = HORIZONTAL_SPEED = 4;
  var shape, firearm;
  var move_right = move_left = move_up = move_down = trigger = false;
  var counter = 0;
  init(image_loader, width, height);

  function init(image_loader, width, height){
    firearm = new Firearm(stage, image_loader, 10, 1, 15, 7);
    shape = new createjs.Shape();
    shape.graphics.bf(image_loader.getResult("components")).drawRect(58,113,14,28);
    shape.regX = 65;
    shape.regY = 127;
    shape.x = width/2;
    shape.y = height + 100;
    shape.width = 14;
    shape.height = 28;
    stage.addChild(shape);
    createjs.Tween.get(shape).to({y:stage.canvas.height - 100},2000).call(initEventHandler);
  }

  function initEventHandler(){
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
    if(move_up && shape.y > 100){
      shape.y -= VERTICAL_SPEED;
    }else if(move_down && shape.y < stage.canvas.height - shape.height){
      shape.y += VERTICAL_SPEED;
    }

    if(move_right && shape.x < stage.canvas.width - shape.width){
      shape.x += VERTICAL_SPEED;
    }else if(move_left && shape.x >= shape.width){
      shape.x -= VERTICAL_SPEED;
    }

    if(trigger && counter >= firearm.getFireRate()){
      firearm.fire(shape.x, shape.y - shape.height);
      counter = 0;
    }
    firearm.tick(stage);
  }
};
