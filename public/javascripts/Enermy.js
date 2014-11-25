function Enermy(stage, image_loader, type, path){
  var shape, container;

  init(image_loader);

  function init(image_loader){
    manifest = [
      {src:"./assets/images/Components64.png", id:"components"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleLoadComplete);
    loader.loadManifest(manifest);
  }

  function handleLoadComplete(){
    shape = new createjs.Shape();
    container = new createjs.Container();
    getShip(container, type);
    getPath(container, path);
    stage.addChild(container);
    createjs.Tween.get(container).to({y:100},2000);
  }

  function getShip(container, type){
    switch(type){
      case 1:
        var body = new createjs.Shape();
        var left_wing = new createjs.Shape();
        var right_wing = new createjs.Shape();

        body.graphics.bf(loader.getResult("components")).dr(243,113,12,24);
        body.width = 12;
        body.height = 24;
        body.regX = 243 + body.width/2;
        body.regY = 113 + body.height/2;
        body.rotation = 180;
        left_wing.graphics.bf(loader.getResult("components")).dr(171,76,23,21);
        left_wing.x = 12;
        left_wing.y = -8;
        left_wing.width = 23;
        left_wing.height = 21;
        left_wing.regX = 171 + left_wing.width/2;
        left_wing.regY = 76 + left_wing.height/2;
        left_wing.rotation = 180;
        right_wing.graphics.bf(loader.getResult("components")).dr(208,76,23,21);
        right_wing.x = -12;
        right_wing.y = -8;
        right_wing.width = 23;
        right_wing.height = 21;
        right_wing.regX = 208 + right_wing.width/2;
        right_wing.regY = 76 + right_wing.height/2;
        right_wing.rotation = 180;
        container.addChild(left_wing,right_wing, body);
        break;
    }
  }

  function getPath(container, path){
    switch(path){
      case 1:
        container.x = 100;
        container.y = -100;
        createjs.Tween.get(container)
          .to({y:150},4000)
          .to({x:150,y:200,rotation:-90},1000)
          .to({x:350},3000)
          .to({x:400,y:250,rotation:0},1000)
          .to({y:600},4000);

        break;
    }
  }

  this.tick = function(stage){

  }
}
