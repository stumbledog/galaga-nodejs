function Game(id){
  var stage = new createjs.Stage(id);
  var ship, image_loader;

  init();

  function init(){
    var manifest = [
      {src:"./assets/images/Components64.png", id:"components"},
      {src:"./assets/images/Items64.png", id:"items"}
    ];

    image_loader = new createjs.LoadQueue(false);
    image_loader.addEventListener("complete", handleLoadComplete);
    image_loader.loadManifest(manifest);
  }

  function handleLoadComplete(){
    ship = new Ship(stage, image_loader, stage.canvas.width, stage.canvas.height);
    createjs.Tween.get(ship.getShape()).to({y:stage.canvas.height - 100},2000).call(initEventHandler);
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
    //var enermy = new Enermy({"game":this,"cropX":58,"cropY":113,"width":14,"height":28});
  }

  function initEventHandler(){
    ship.initEventHandler();
  }

  function tick(){
    ship.tick(stage);
    stage.update();
  }
}
