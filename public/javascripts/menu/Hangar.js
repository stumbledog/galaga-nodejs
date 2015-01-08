function Hangar(){
	var ships_container, weapon_container, selected_ship_container, container, upgrade_container, stats_container, name_text;
	var item_container, gold_text;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();
	var ships = [];
	var selectedShip;
	init();

	function init(){
		container = new createjs.Container();
		name_text = new createjs.Text("","12px Arial","#fff");
		name_text.textAlign = "center";
		name_text.x = 320;
		name_text.y = 240;

		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").dr(10,10,620,504).s("#fff").ss(1).f("#000").dr(380,60,240,380).dr(20,60,240,380);

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

		stats_container = new createjs.Container();
		stats_container.x = 30;
		stats_container.y = 70;

		upgrade_container = new createjs.Container();
		upgrade_container.x = 390;
		upgrade_container.y = 70;

		var select_button_container = new createjs.Container();
		var select_button = new createjs.Shape();
		var select_text = new createjs.Text("Select Ship","12px Arial","#FFBE2C");

		select_button_container.x = 320;
		select_button_container.y = 260;
		select_button.graphics.s("#fff").ss(2).f("#333").rr(-40,0,80,16,5);
		select_text.textAlign = "center";
		select_text.y = 3;
		select_button_container.cursor = "pointer";
		select_button_container.addEventListener("mousedown", function(event){
			$.post("/selectShip", {ship:selectedShip._id}, function(res){
				console.log(res);
				if(res.code > 0){
					user.setShip(selectedShip);
				}
			});
		});

		select_button_container.addChild(select_button, select_text);

		container.addChild(background, ships_container, weapon_container, selected_ship_container, close_button, stats_container, upgrade_container, select_button_container, name_text);
	}



	function renderShipList(ships){
		ships_container.removeAllChildren();
		var index = 0;
		ships.forEach(function(ship){
			renderShip(ship, index);
			index++;
		});
	}

	function renderShip(ship, index){
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
	}

	function renderStats(ship){
		stats_container.removeAllChildren();
		var health = ship.health + ship.upgrade.health.value;
		var armor = ship.armor + ship.upgrade.armor.value;
		var speed = ship.speed + ship.upgrade.speed.value;
		var firerate = ship.firearm.firerate + ship.upgrade.firerate.value;
		var accuracy = ship.firearm.accuracy + ship.upgrade.accuracy.value;
		var damage = ship.firearm.bullet.damage + ship.upgrade.damage.value;
		var critical_damage = ship.firearm.bullet.critical_damage + ship.upgrade.critical_damage.value;
		var critical_rate = ship.firearm.bullet.critical_rate + ship.upgrade.critical_rate.value;
		var dps = 30 / firerate * accuracy / 100 * damage * (1 - critical_rate * (1 - critical_damage));

		renderStat("Health", health, 0);
		renderStat("Armor", Math.round((armor)*10)/10 + " ("+(armor / (armor + 25) * 100).toFixed(2)+"% damage reduction)", 25);
		renderStat("Speed", Math.round((speed)*10)/10, 50);
		renderStat("Firerate", Math.round(30 / firerate * 100)/100  +" shoots per second", 75);
		renderStat("Accuracy", Math.round((accuracy)*10)/10+"%", 100);
		renderStat("Damage", Math.round((damage)*10)/10, 125);
		renderStat("Critical Damage", Math.round((critical_damage)*100)+"%", 150);
		renderStat("Critical Rate", Math.round((critical_rate)*1000)/10+"%", 175);
		renderStat("DPS", Math.round(dps*100)/100, 200);
	}

	function renderStat(type, amount, y){
		var text = new createjs.Text(type + ":","12px Arial","#FFB03B");
		text.y = y + 2;
		var amount_text = new createjs.Text(amount,"12px Arial","#fff");
		amount_text.x = text.getMeasuredWidth() + 5;
		amount_text.y = y + 2;

		stats_container.addChild(text, amount_text);
	}

	function renderUpgrade(ship){
		upgrade_container.removeAllChildren();
		var upgrade_text = new createjs.Text("Upgrade","bold 16px Arial","#fff");
		upgrade_text.x = 10;
		upgrade_text.y = -30;

		renderUpgradeButton("Health", ship.upgrade.health, ship.price / 10, 0, 0);
		renderUpgradeButton("Armor", ship.upgrade.armor, ship.price / 10, 25, 1);
		renderUpgradeButton("Speed", ship.upgrade.speed, ship.price / 10, 50, 1);
		renderUpgradeButton("Firerate", ship.upgrade.firerate, ship.price / 10, 75, 2);
		renderUpgradeButton("Accuracy", ship.upgrade.accuracy, ship.price / 10, 100, 2);
		renderUpgradeButton("Damage", ship.upgrade.damage, ship.price / 10, 125, 2);
		renderUpgradeButton("Crit Damage", ship.upgrade.critical_damage, ship.price / 10, 150, 2);
		renderUpgradeButton("Crit Rate", ship.upgrade.critical_rate, ship.price / 10, 175, 3);

		upgrade_container.addChild(upgrade_text);
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
		upgrade_price.y = y + 3;
		upgrade_price.textAlign = "center";
		upgrade_container.addChild(text, upgrade_amount_text, upgrade_button, upgrade_price);

		upgrade_button.addEventListener("mousedown", function(event){
			$.post("/upgrade",{ship:selectedShip._id, type:type},function(res){
				console.log(res);
				if(res.code>0){
					selectedShip.upgrade = res.ship.upgrade;
					user.setGold(res.gold);
					selectShip(selectedShip);
				}else{
					alert(res.msg);
				}

			});
		});
	}

	function selectShip(ship){
		selectedShip = ship;
		name_text.text = ship.name;
		selected_ship_container.removeAllChildren();
		selected_ship_container.addChild(Renderer.renderShip(selectedShip, loader));
		renderUpgrade(selectedShip);
		renderStats(selectedShip);
		stage.update();
	}

	var public = {
		open:function(){
			stage.addChild(container);
			$.get("/getUserShips", function(res){
				ships = res.ships;
				ships.forEach(function(ship){
					if(ship._id === user.getShip()._id){
						selectShip(ship);
						return;
					}
				});
				renderShipList(ships);
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