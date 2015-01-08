function Hangar(){
	var ships_container, weapon_container, selected_ship_container, container, upgrade_container;
	var item_container, gold_text;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();
	var selectedShip;
	init();

	function init(){
		container = new createjs.Container();
		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").dr(10,10,620,504).s("#fff").ss(1).f("#000").dr(380,60,240,380);

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

		upgrade_container = new createjs.Container();
		upgrade_container.x = 390;
		upgrade_container.y = 70;

		container.addChild(background, ships_container, weapon_container, selected_ship_container, close_button, upgrade_container);
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
		upgrade_container.removeAllChildren();
		var upgrade_text = new createjs.Text("Upgrade","bold 16px Arial","#fff");
		upgrade_text.x = 10;
		upgrade_text.y = -30;

		renderUpgradeButton("Health", ship.upgrade.health, ship.price / 10, 0, 0);
		renderUpgradeButton("Armor", ship.upgrade.armor, ship.price / 10, 25, 0);
		renderUpgradeButton("Firerate", ship.upgrade.firerate, ship.price / 10, 50, 2);
		renderUpgradeButton("Accuracy", ship.upgrade.accuracy, ship.price / 10, 75, 2);
		renderUpgradeButton("Damage", ship.upgrade.damage, ship.price / 10, 100, 2);
		renderUpgradeButton("Crit Damage", ship.upgrade.critical_damage, ship.price / 10, 125, 2);
		renderUpgradeButton("Crit Rate", ship.upgrade.critical_rate, ship.price / 10, 150, 2);

		upgrade_container.addChild(upgrade_text);
		stage.update();
	}

	function renderUpgradeButton(type, upgrade, upgrade_unit_price, y, fixed){
		var text = new createjs.Text(type + ":","12px Arial","#FFB03B");
		text.y = y + 2;
		var upgrade_amount_text = new createjs.Text(upgrade.count+"("+upgrade.value.toFixed(fixed)+")","12px Arial","#fff");
		upgrade_amount_text.x = text.getMeasuredWidth() + 5;
		upgrade_amount_text.y = y + 2;

		var upgrade_button = new createjs.Shape();
		upgrade_button.graphics.s("#fff").ss(2).f("#333").rr(0,y,80,16,5);
		upgrade_button.x = 140;
		upgrade_button.cursor = "pointer";

		var upgrade_price = new createjs.Text(upgrade_unit_price * (1 + upgrade.count), "12px Arial", "#FFBE2C");
		upgrade_price.x = 180;
		upgrade_price.y = y + 2;
		upgrade_price.textAlign = "center";
		upgrade_container.addChild(text, upgrade_amount_text, upgrade_button, upgrade_price);

		upgrade_button.addEventListener("mousedown", function(event){
			$.post("/upgrade",{ship:selectedShip._id, type:type},function(res){
				console.log(res);
				selectedShip = res.ship;
				renderUpgrade(selectedShip);
			});
		});

	}

	function upgrade(part){
		
	}

	function selectShip(ship){
		selectedShip = ship;
		selected_ship_container.removeAllChildren();
		selected_ship_container.addChild(Renderer.renderShip(ship, loader));
		renderUpgrade(ship);
	}

	var public = {
		open:function(){
			stage.addChild(container);
			$.get("/getUserShips", function(res){
				res.ships.forEach(function(ship){
					if(ship._id === User.getInstance().getShip()._id){
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