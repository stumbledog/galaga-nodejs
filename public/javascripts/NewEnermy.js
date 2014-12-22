function NewEnermy(property){
	var ALIVE = true;
	var DESTROYED = false;
	var NORMAL = 1;

	var container;

	var width, height;

	init(property);

	function init(property){
		container = new createjs.Container();

		width = property.width;
		height = property.height;

		renderShape(property.components);
	}

	function renderShape(components){
		components.forEach(function(component){
			var shape = new createjs.Shape();
			shape.graphics.bf(loader.getResult("components")).dr(component.crop_x,component.crop_y,component.width,component.height);
			shape.regX = component.crop_x + component.width / 2;
			shape.regY = component.crop_y + component.height / 2;
			shape.x = component.x;
			shape.y = component.y;
			container.addChild(shape);
		});
		container.x =container.y = 320;
		stage.addChild(container);
	}
}