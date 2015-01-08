function Hangar(){
	var ships_container, weapon_container, selected_ship_container, container;
	var item_container, gold_text;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();
	var selectedShip = User.getInstance().getShip();

	init();

	function init(){
		container = new createjs.Container();
		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").dr(10,10,620,504).s("#fff").ss(1).dr(400,60,220,380);

		ships_container = new createjs.Container();
		ships_container.x = 14;
		ships_container.y = 450;
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

		container.addChild(background, ships_container, weapon_container, selected_ship_container, close_button);
	}

	function renderShipList(ships){
		ships_container.removeAllChildren();
		var index = 0;
		ships.forEach(function(ship){
			var ship_container = new createjs.Container();
			var mask = new createjs.Shape();
			mask.graphics.beginFill("#f00").drawRect(index * 60,0,60,60);
			ship_container.mask = mask;
			var max = ship.shape.width > ship.shape.height ? ship.shape.width : ship.shape.height;
			var shape_container = Renderer.renderShip(ship, loader);
			shape_container.x = shape_container.y = 30;
			var background = new createjs.Shape();
			background.graphics.s("#FFB03B").ss(2).f("#FFF0A5").dr(0,0,60,60);
			ship_container.x = index * 60;
			ship_container.cursor = "pointer";
			ship_container.addEventListener("mousedown", function(event){
				selectShip(ship);
			});
			ship_container.addChild(background, shape_container);
			ships_container.addChild(ship_container);
			index++;
		});
	}

	function renderUpgrade(ship){
		console.log(ship.upgrade);
	}

	function upgrade(part){
		
	}

	function selectShip(ship){
		selected_ship_container.removeAllChildren();
		selected_ship_container.addChild(Renderer.renderShip(ship, loader));
		renderUpgrade(ship);

		stage.update();
	}

	var public = {
		open:function(){
			stage.addChild(container);
			$.get("/getUserShips", function(res){
				res.ships.forEach(function(ship){
					if(ship._id === selectedShip._id){
						selectShip(ship);
						return;
					}
				});
				renderShipList(res.ships);
				stage.update();
			});
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