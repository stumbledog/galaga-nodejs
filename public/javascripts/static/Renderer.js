function Renderer(){}

Renderer.renderShip = function(ship, loader){
	var container = new createjs.Container();
	ship.shape.components.forEach(function(component){
		var shape = new createjs.Shape();
		shape.graphics.bf(loader.getResult(ship.shape.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
		shape.regX = component.crop_x + component.width / 2;
		shape.regY = component.crop_y + component.height / 2;
		shape.x = component.x;
		shape.y = component.y;
		container.addChild(shape);
	});
	return container;
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