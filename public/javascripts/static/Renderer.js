function Renderer(){}

Renderer.renderShip = function(ship, loader){
	var shape = new createjs.Shape();
	shape.graphics.bf(loader.getResult(ship.file)).drawRect(ship.crop_x,ship.crop_y,ship.width,ship.height);
	shape.regX = ship.crop_x + ship.width / 2;
	shape.regY = ship.crop_y + ship.height / 2;
	return shape;
}

Renderer.slideText = function(msg, color, stage){
	var container = new createjs.Container();
	container.x = -300
	container.y = 320;
	var outline = new createjs.Text(msg, "bold 36px Arial", "#fff");
	outline.outline = 5;
	outline.textAlign = "center";
	outline.textBaseline = "middle";
	var text = outline.clone();
	text.outline = false;
	text.color = color;

	container.addChild(outline, text);
	createjs.Tween.get(container).to({x:320},1000, createjs.Ease.backInOut).wait(1000).to({x:940},1000, createjs.Ease.backInOut).call(function(){
		stage.removeChild(container);
	});
	stage.addChild(container);
}