function Hangar(){
	var ship_container, weapon_container, selected_ship_container;
	var hangar = this;
	var item_container, gold_text;
	var user = User.getInstance();
	var selected_ship;
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();

	this.isOpen = false;

	init.call(this);

	function init(){
		render.call(this);
	}

	function render(){
		this.container = new createjs.Container();
		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").rr(10,10,620,400,10).rr(10,420,620,100,10);

		ship_container = new createjs.Container();
		weapon_container = new createjs.Container();

		selected_ship_container = new createjs.Container();
		selected_ship_container.x = 210;
		selected_ship_container.y = 70;

		var close_button = new createjs.Shape();
		close_button.graphics.bf(loader.getResult("button")).drawRect(638,1094,63,66);
		close_button.regX = 670;
		close_button.regY = 1127;
		close_button.x = 605;
		close_button.y = 35;
		close_button.scaleX = close_button.scaleY = 0.5;
		close_button.cursor = "pointer";
		close_button.addEventListener("mousedown", function(event){
			hangar.close();
		});
		this.container.addChild(background, ship_container, weapon_container, selected_ship_container, close_button);
	}

	function renderShipList(ships){
		ship_container.removeAllChildren();
		var index = 0;
		var offsetX = 0;
		ships.forEach(function(ship){
			var shape_container = new createjs.Container();
			renderShip(ship, shape_container);
			offsetX += ship.shape.width;
			shape_container.x = 20 + offsetX;
			shape_container.y = 470;
			shape_container.cursor = "pointer";
			shape_container.addEventListener("mousedown", function(event){
				selectShip(ship);
			});
			ship_container.addChild(shape_container);
			index++;
		});
	}

	function renderShip(ship, container){
		ship.shape.components.forEach(function(component){
			var shape = new createjs.Shape();
			shape.graphics.bf(loader.getResult(ship.shape.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
			shape.regX = component.crop_x + component.width / 2;
			shape.regY = component.crop_y + component.height / 2;
			shape.x = component.x;
			shape.y = component.y;
			container.addChild(shape);
		});
	}

	function selectShip(ship){
		selected_ship_container.removeAllChildren();
		renderShip(ship, selected_ship_container);
		stage.update();
	}

	this.open = function(){
		$.get("/getUserShips", function(res){
			renderShipList(res.ships);
		});

		this.isOpen = true;
		stage.addChild(this.container);
		stage.update();
	}

	this.close = function(){
		this.isOpen = false;
		stage.removeChild(this.container);
		stage.update();
	}
}