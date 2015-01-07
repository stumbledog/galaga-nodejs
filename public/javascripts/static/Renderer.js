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