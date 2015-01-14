function Store(){	
	var items_container, gold_text;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();

	init();

	function init(){
		container = new createjs.Container();

		items_container = new createjs.Container();
		items_container.x = 20;
		items_container.y = 20;

		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").rr(10,10,620,500,10);
		
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

		container.addChild(background, close_button, items_container);
		getShips();
	}

	function getShips(){
		$.get("/getShips", function(res){
			renderShips(res.ships);
		});
	}

	function renderShips(ships){
		var index = 0;
		ships.forEach(function(ship){
			var item_container = new createjs.Container();
			var border = new createjs.Shape();
			border.graphics.s("#fff").ss(2).f("#000").rr(0,0,112,158,5);

			var shape_container = Renderer.renderShip(ship.shape, loader);
			shape_container.scaleX = shape_container.scaleY = Math.sqrt(ship.shape.height*ship.shape.width) < 64? 1 : 64/Math.sqrt(ship.shape.height*ship.shape.width);

			shape_container.x = 56;
			shape_container.y = 80;

			var health_text = new createjs.Text("Health: ","11px Arial","#FFB03B");
			var health_amount_text = new createjs.Text(ship.health,"11px Arial","#fff");
			health_text.x = 5;
			health_amount_text.x = health_text.getMeasuredWidth() + 5;
			health_text.y = health_amount_text.y = 5;

			var speed_text = new createjs.Text("Speed: ","11px Arial","#FFB03B");
			var speed_amount_text = new createjs.Text(ship.speed,"11px Arial","#fff");
			speed_text.x = 5;
			speed_amount_text.x = speed_text.getMeasuredWidth() + 5;
			speed_text.y = speed_amount_text.y = 16;

			var accuracy_text = new createjs.Text("Accuracy: ","11px Arial","#FFB03B");
			accuracy_amount_text = new createjs.Text(ship.firearm.accuracy+"%","11px Arial","#fff");
			accuracy_text.x = 5;
			accuracy_amount_text.x = accuracy_text.getMeasuredWidth() + 5;
			accuracy_text.y = accuracy_amount_text.y = 27;

			var firearm = ship.firearm;
			var bullet = firearm.bullet;
			
			var dps = 30 / firearm.firerate* firearm.shots * firearm.accuracy / 100 * bullet.damage * ((1 - bullet.critical_rate * (1 - bullet.critical_damage)));

			var dps_text = new createjs.Text("DPS: ","11px Arial","#FFB03B");
			var dps_amount_text = new createjs.Text(dps.toFixed(2),"11px Arial","#fff");

			dps_text.x = 5;
			dps_amount_text.x = dps_text.getMeasuredWidth() + 5;
			dps_text.y = dps_amount_text.y = 38;

			var button_container = new createjs.Container();
			var button_border = new createjs.Shape();
			button_border.graphics.s("#fff").ss(2).f("#333").rr(0,0,92,20,5);
			if(ship.purchased){
				var button_text = new createjs.Text("Owned","12px Arial","#FFBE2C");
			}else{
				var button_text = new createjs.Text(ship.price,"12px Arial","#FFBE2C");
				button_container.cursor = "pointer";
				var handler = function(event){
					confirm(event, "Do you want to pay " + ship.price + " for "+ship.name+"?", function(callback){
						$.post("/buyShip",{ship_id:ship._id},function(res){
							if(res.code > 0){
								user.setGold(res.user.gold);
								user.setShip(res.ship);
								button_text.text = "Owned"
								button_container.removeEventListener("mousedown", handler);
								button_container.cursor = "null";
								Renderer.slideText("You purchased " + res.ship.name, "#DB9E36", stage);
							}else{

							}
							callback();
						});
					});
				}
				button_container.addEventListener("mousedown", handler);
			}
			button_text.textAlign = "center";
			button_text.x = 46;
			button_text.y = 4;

			var name = new createjs.Text(ship.name,"12px Arial","#fff");
			name.textAlign = "center";
			name.x = 56;
			name.y = 110;

			button_container.x = 10;
			button_container.y = 130;
			button_container.addChild(button_border, button_text);

			item_container.x = index % 5 * 122;
			item_container.y = parseInt(index / 5) * 162;

			item_container.addChild(border, shape_container, health_text, health_amount_text, speed_text, speed_amount_text, accuracy_text, accuracy_amount_text, dps_text, dps_amount_text, button_container, name);
			items_container.addChild(item_container);
			index++;
		});
	}

	function confirm(event, msg, callback){
		var confirm_container = new createjs.Container();
		var text = new createjs.Text(msg, "12px Arial","#fff");
		var border = new createjs.Shape();
		var yes_button = new createjs.Container();
		var no_button = new createjs.Container();
		var yes_text = new createjs.Text("Yes","12px Arial","#fff");
		var no_text = new createjs.Text("No","12px Arial","#fff");
		var yes_border = new createjs.Shape();
		var no_border = new createjs.Shape();
		yes_border.graphics.s("#fff").ss(2).f("#468966").rr(0,0,60,20,5);
		yes_button.y = 35;
		yes_button.x = text.getMeasuredWidth()/2 + 10 - 65;
		yes_text.textAlign = "center";
		yes_text.x = 30;
		yes_text.y = 4;
		yes_button.addChild(yes_border, yes_text);

		yes_button.addEventListener("mousedown", function(event){
			callback(function(){
				stage.removeChild(confirm_container);
			});
		});

		no_border.graphics.s("#fff").ss(2).f("#B64926").rr(0,0,60,20,5);
		no_button.y = 35;
		no_button.x = text.getMeasuredWidth()/2 + 10 + 5;
		no_text.textAlign = "center";
		no_text.x = 30;
		no_text.y = 4;
		no_button.addChild(no_border, no_text);

		yes_button.cursor = no_button.cursor = "pointer";

		no_button.addEventListener("mousedown", function(event){
			stage.removeChild(confirm_container);
		});

		text.x = text.y = 10;
		border.graphics.s("#fff").ss(2).f("#000").rr(0,0,text.getMeasuredWidth() + 20,70,5);
		confirm_container.x = 320 - text.getMeasuredWidth()/2 - 10;
		confirm_container.y = 320 - 40;
		confirm_container.addChild(border, text, yes_button, no_button);
		stage.addChild(confirm_container);
	}

	var public = {
		open:function(){
			stage.addChild(container);
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