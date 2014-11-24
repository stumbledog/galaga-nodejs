function Game(id){
  var CIRCLE_RADIUS = 25;
  var VERTICAL_SPEED = 3;
  var HORIZONTAL_SPEED = 3;

  var stage = new createjs.Stage(id);
  var ship, loader;
  init();

  function init(){
    manifest = [
      {src:"./assets/images/Ships64.png", id:"ship"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
  }

  function handleComplete(){
    console.log(loader.getResult("ship"));

    ship = new createjs.Shape();
    ship.graphics.bf(loader.getResult("ship")).drawRect(0,0,64,64);
    stage.addChild(ship);
    stage.update();
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(30);
    console.log(ship.getMatrix());
  }

  function tick() {
    ship.x += horizontalSpeed;
    ship.y += verticalSpeed;
    stage.update();
  }

  var horizontalSpeed = 0;
  var verticalSpeed = 0;

  function handleKeyDown(event) {
    console.log(event.keyCode);
    switch(event.keyCode) {
      case 87:
        verticalSpeed = -VERTICAL_SPEED;
        break;
      case 68:
        horizontalSpeed = HORIZONTAL_SPEED;
        break;
      case 83:
        verticalSpeed = VERTICAL_SPEED;
        break;
      case 65:
        horizontalSpeed = -HORIZONTAL_SPEED;
        break;
    }
  }

  function handleKeyUp(event) {
    console.log(event.keyCode);
    switch(event.keyCode) {
      case 87:
      case 83:
        verticalSpeed = 0;
        break;
      case 68:
      case 65:
        horizontalSpeed = 0;
        break;
    }
  }
}
