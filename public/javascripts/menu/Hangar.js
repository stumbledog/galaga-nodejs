function Hangar(){
	var ship_container, weapon_container, selected_ship_container, container;
	var item_container, gold_text;
	var user = User.getInstance();
	var selected_ship;
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();

	init();

	function init(){
		container = new createjs.Container();
		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").rr(10,10,620,400,10).s("#ccc").f("#fff").rr(10,420,620,100,10);

		ship_container = new createjs.Container();
		weapon_container = new createjs.Container();

		selected_ship_container = new createjs.Container();
		selected_ship_container.x = 320;
		selected_ship_container.y = 200;

		var close_button = new createjs.Shape();
		close_button.graphics.bf(loader.getResult("button")).drawRect(638,1094,63,66);
		close_button.regX = 670;
		close_button.regY = 1127;
		close_button.x = 605;
		close_button.y = 35;
		close_button.scaleX = close_button.scaleY = 0.5;
		close_button.cursor = "pointer";
		close_button.addEventListener("mousedown", function(event){
			public.close();
		});
		container.addChild(background, ship_container, weapon_container, selected_ship_container, close_button);
	}

	function renderShipList(ships){
		ship_container.removeAllChildren();
		var index = 0;
		var offsetX = 0;
		ships.forEach(function(ship){
			var shape_container = Renderer.renderShip(ship, loader);
			offsetX += ship.shape.width/2 + 20;
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

	function selectShip(ship){
		selected_ship_container.removeAllChildren();
		selected_ship_container.addChild(Renderer.renderShip(ship, loader));
		stage.update();
	}

	var public = {
		open:function(){
			$.get("/getUserShips", function(res){
				renderShipList(res.ships);
			});

			stage.addChild(container);
			stage.update();
		},
		close:function(){
			stage.removeChild(container);
			stage.update();
		},
		isOpen:function(){
			return stage.getChildIndex(container) > 0;
		}
	}
	return public;
}