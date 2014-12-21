function NewEnermy(property){
	var ALIVE = true;
	var DESTROYED = false;
	var NORMAL = 1;

	var container;
	var stage = stage;

	var width, height;

	console.log(property);

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
			shape.graphics.bf(loader.getResult("components")).dr(component.x,component.y,component.width,component.height);
			shape.regX = component.x + component.width / 2;
			shape.regY = component.y + component.height / 2;
			container.addChild(shape);
		});
	}
}