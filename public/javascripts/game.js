function Game(id){
  var CIRCLE_RADIUS = 25;
  var stage = new createjs.Stage(id);
  var ship, loader;
  init();

  function init(){
    manifest = [
      {src:"./assets/images/Ships.png", id:"ship"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
  }

  function handleComplete(){
    console.log(loader.getResult("ship"));

    ship = new createjs.Shape();
    ship.graphics.bf(loader.getResult("ship")).drawRect(0,0,1000,1000);
    ship.scaleX = ship.scaleY = 0.032;
    stage.addChild(ship);
    stage.update();

  }

}
