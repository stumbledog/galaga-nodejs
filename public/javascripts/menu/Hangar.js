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
		name_text.y = 400;

		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").dr(10,10,620,504).s("#fff").ss(1).f("#000").dr(270,60,350,235).dr(20,60,240,380);

		ships_container = new createjs.Container();
		ships_container.x = 14;
		ships_container.y = 450;
		weapon_container = new createjs.Container();

		selected_ship_container = new createjs.Container();
		selected_ship_container.x = 320;
		selected_ship_container.y = 360;

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
		upgrade_container.x = 280;
		upgrade_container.y = 70;

		var select_button_container = new createjs.Container();
		var select_button = new createjs.Shape();
		var select_text = new createjs.Text("Select Ship","12px Arial","#FFBE2C");

		select_button_container.x = 320;
		select_button_container.y = 420;
		select_button.graphics.s("#fff").ss(2).f("#333").rr(-40,0,80,18,5);
		select_text.textAlign = "center";
		select_text.y = 2;
		select_button_container.cursor = "pointer";
		select_button_container.addEventListener("mousedown", function(event){
			$.post("/selectShip", {ship:selectedShip._id}, function(res){
				if(res.code > 0){
					Renderer.slideText(selectedShip.name + " is ready for takeoff!","#468966", stage);
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
		mask.graphics.beginFill("#f00").drawRect(index * 56,0,58,60);
		ship_container.mask = mask;
		var max = ship.shape.width > ship.shape.height ? ship.shape.width : ship.shape.height;
		var shape_container = Renderer.renderShip(ship.shape, loader);
		shape_container.scaleX = shape_container.scaleY = Math.sqrt(ship.shape.height*ship.shape.width) < 64? 1 : 64/Math.sqrt(ship.shape.height*ship.shape.width);
		shape_container.x = 28,
		shape_container.y = 30;
		var background = new createjs.Shape();
		background.graphics.f("#fff").dr(0,0,56,60);
		var border = new createjs.Shape();
		border.graphics.s("#000").ss(4).dr(0,0,56,60);
		ship_container.x = index * 56;
		ship_container.cursor = "pointer";
		ship_container.addEventListener("mousedown", function(event){
			selectShip(ship);
		});
		ship_container.addChild(background, shape_container, border);
		ships_container.addChild(ship_container);
	}

	function renderStats(ship){
		stats_container.removeAllChildren();
		var health = (ship.health + ship.upgrade.health.value) * (1 + user.getIncreaseDamage()/10);
		var armor = ship.armor + ship.upgrade.armor.value;
		var speed = ship.speed * (1 + user.getIncreaseSpeed()/10);
		var firerate = ship.firearm.firerate + ship.upgrade.firerate.value;
		var shots = ship.firearm.shots * (1 + user.getMultiShot());
		var accuracy = (ship.firearm.accuracy + ship.upgrade.accuracy.value)*(1 + user.getIncreaseAccuracy()/10)*(1 - user.getDecreaseAccuracy()/10);
		var damage = (ship.firearm.bullet.damage + ship.upgrade.damage.value) * (1 + user.getIncreaseDamage()/10);
		var critical_damage = ship.firearm.bullet.critical_damage + ship.upgrade.critical_damage.value;
		var critical_rate = ship.firearm.bullet.critical_rate + ship.upgrade.critical_rate.value;
		var dps = shots * 30 / firerate * accuracy / 100 * damage * (1 - critical_rate * (1 - critical_damage));

		renderStat("Health", health, 0);
		renderStat("Armor", Math.round((armor)*10)/10 + " ("+(armor / (armor + 25) * 100).toFixed(2)+"% damage reduction)", 25);
		renderStat("Speed", Math.round((speed)*10)/10, 50);
		renderStat("Firerate", Math.round(30 / firerate * 100)/100  +" shoots per second", 75);
		renderStat("Shots", "x " + shots + " shoots at once", 100);
		renderStat("Accuracy", Math.round((accuracy)*10)/10+"%", 125);
		renderStat("Damage", Math.round((damage)*10)/10, 150);
		renderStat("Critical Damage", Math.round((critical_damage)*100)+"%", 175);
		renderStat("Critical Rate", Math.round((critical_rate)*1000)/10+"%", 200);
		renderStat("DPS", Math.round(dps*100)/100, 225);
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

		var upgrade_x1 = new createjs.Text("x1", "12px Arial","#fff");
		var upgrade_x10 = new createjs.Text("x10", "12px Arial","#fff");
		var upgrade_x100 = new createjs.Text("x100", "12px Arial","#fff");
		upgrade_x1.y = upgrade_x10.y = upgrade_x100.y = 6;
		upgrade_x1.textAlign = upgrade_x10.textAlign = upgrade_x100.textAlign = "center";
		upgrade_x1.x = 160;
		upgrade_x10.x = 230;
		upgrade_x100.x = 300;


		renderUpgradeButton("Health", ship.upgrade.health, 25, 0);
		renderUpgradeButton("Armor", ship.upgrade.armor, 50, 1);
		//renderUpgradeButton("Speed", ship.upgrade.speed, 75, 1);
		renderUpgradeButton("Firerate", ship.upgrade.firerate, 75, 2);
		//renderUpgradeButton("Accuracy", ship.upgrade.accuracy, 125, 2);
		renderUpgradeButton("Damage", ship.upgrade.damage, 100, 2);
		renderUpgradeButton("Crit Damage", ship.upgrade.critical_damage, 125, 2);
		renderUpgradeButton("Crit Rate", ship.upgrade.critical_rate, 150, 3);

		upgrade_container.addChild(upgrade_text, upgrade_x1, upgrade_x10, upgrade_x100);
	}

	function renderUpgradeButton(type, upgrade, y, fixed){
		var text = new createjs.Text(type + ":","12px Arial","#FFB03B");
		text.y = y + 2;

		var upgrade_amount_text = new createjs.Text(upgrade.count+"("+upgrade.value.toFixed(fixed)+")","12px Arial","#fff");
		upgrade_amount_text.x = text.getMeasuredWidth() + 5;
		upgrade_amount_text.y = y + 2;

		multipleButtons(type,upgrade,y,0);
		multipleButtons(type,upgrade,y,1);
		multipleButtons(type,upgrade,y,2);

		upgrade_container.addChild(text, upgrade_amount_text);
	}

	function multipleButtons(type,upgrade,y,index){
		var current_price = 10 * (1 + upgrade.count);
		var n = Math.pow(10,index);
		var price = n * (current_price * 2 + (n-1) * 10)/2;
		
		var upgrade_button = new createjs.Shape();
		upgrade_button.graphics.s("#fff").ss(2).f("#333").rr(0,y,60,18,5);
		upgrade_button.x = 130 + index * 70;
		upgrade_button.cursor = "pointer";

		var upgrade_price = new createjs.Text(price, "10px Arial", "#FFBE2C");
		upgrade_price.x = 160 + index * 70;
		upgrade_price.y = y + 3;
		upgrade_price.textAlign = "center";
		upgrade_container.addChild(upgrade_button, upgrade_price);

		upgrade_button.addEventListener("mousedown", function(event){
			$.post("/upgrade",{ship:selectedShip._id, type:type, multiple:n},function(res){
				if(res.code>0){
					selectedShip.upgrade = res.ship.upgrade;
					user.setGold(res.gold);
					selectShip(selectedShip);					
					Renderer.slideText(type+" is upgraded x"+(res.upgrade.count - upgrade.count), "#FFB03B", stage);
				}else{
					Renderer.slideText(res.msg, "#8E2800", stage);
				}
			});
		});
	}

	function selectShip(ship){
		selectedShip = ship;
		name_text.text = ship.name;
		selected_ship_container.removeAllChildren();
		selected_ship_container.addChild(Renderer.renderShip(selectedShip.shape, loader));
		renderUpgrade(selectedShip);
		renderStats(selectedShip);
	}

	var public = {
		open:function(){
			stage.addChild(container);
			$.get("/getUserShips", function(res){
				ships = res.ships;
				ships.forEach(function(ship){
					user = User.getInstance();
					//if(ship._id === user.getShip()._id){
						selectShip(ship);
						return;
					//}
				});
				renderShipList(ships);
			});
		},
		close:function(){
			stage.removeChild(container);
		},
		isOpen:function(){
			return stage.getChildIndex(container) > 0;
		}
	}
	return public;
}