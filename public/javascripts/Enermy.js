function Enermy(p){
  var stage = p.game.stage;
  var loader, ship;
  this.ship = ship;
  init();

  function init(){
    manifest = [
      {src:"./assets/images/Components64.png", id:"components"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", p.game.handleLoadComplete.call(p.game));
    loader.loadManifest(manifest);
  }

  function handleLoadComplete(){
    ship = new createjs.Shape();
    ship.graphics.bf(loader.getResult("components")).dr(p.cropX,p.cropY,p.width,p.height);
    ship.regX = p.cropX+p.width/2;
    ship.regY = p.cropY+p.height/2;
    ship.x = stage.canvas.width/2;
    ship.y = -100;
    ship.rotation = 180;
    ship.width = p.width;
    ship.height = p.height;
    stage.addChild(ship);
    createjs.Tween.get(ship).to({y:100},2000);
  }
}

Enermy.prototype.getBound = function(){
  return {"x":this.ship.x, "y":this.ship.y, "width":this.ship.width, "height":this.ship.height};
}
