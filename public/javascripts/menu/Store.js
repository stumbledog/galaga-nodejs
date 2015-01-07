function Store(){
	
	this.isOpen = false;
	var store = this;
	var item_container, gold_text;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();

	init.call(this);

	function init(){
		render.call(this);
	}

	function render(){
		this.container = new createjs.Container();

		item_container = new createjs.Container();
		item_container.x = 20;
		item_container.y = 20;

		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").rr(10,10,620,540,10);
		
		var close_button = new createjs.Shape();
		close_button.graphics.bf(loader.getResult("button")).drawRect(638,1094,63,66);
		close_button.regX = 670;
		close_button.regY = 1127;
		close_button.x = 605;
		close_button.y = 35;
		close_button.scaleX = close_button.scaleY = 0.5;
		close_button.cursor = "pointer";
		close_button.addEventListener("mousedown", function(event){
			store.close();
		});

		this.container.addChild(background, close_button, item_container);
		getItems("ship");
	}

	function getItems(type){
		$.post("/getItems/",{type:type}, function(res){
			if(type === "ship"){
				console.log(res);
				renderShips(res.items);
			}else{

			}
		});
	}

	function renderShips(ships){
		var index = 0;
		ships.forEach(function(ship){
			var container = new createjs.Container();
			var border = new createjs.Shape();
			border.graphics.s("#fff").ss(2).f("#000").rr(0,0,100,160,5);

			var shape_container = new createjs.Container();
			ship.shape.components.forEach(function(component){
				var shape = new createjs.Shape();
				shape.graphics.bf(loader.getResult(this.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
				shape.regX = component.crop_x + component.width / 2;
				shape.regY = component.crop_y + component.height / 2;
				shape.x = component.x + 50;
				shape.y = component.y + 80;
				shape_container.addChild(shape);
			}, ship.shape);

			var health_text = new createjs.Text("Health: ","12px Arial","#FFB03B");
			var health_amount_text = new createjs.Text(ship.health,"12px Arial","#fff");
			health_text.x = 5;
			health_amount_text.x = health_text.getMeasuredWidth() + 5;
			health_text.y = health_amount_text.y = 5;
			
			var speed_text = new createjs.Text("Speed: ","12px Arial","#FFB03B");
			var speed_amount_text = new createjs.Text(ship.speed,"12px Arial","#fff");
			speed_text.x = 5;
			speed_amount_text.x = speed_text.getMeasuredWidth() + 5;
			speed_text.y = speed_amount_text.y = 18;
			
			var firearm = ship.firearm;
			var bullet = firearm.bullet;
			
			var dps = 30 / firearm.firerate * firearm.accuracy / 100 * bullet.damage * ((1 - bullet.critical_rate * (bullet.critical_damage - 1)));

			var dps_text = new createjs.Text("DPS: ","12px Arial","#FFB03B");
			var dps_amount_text = new createjs.Text(dps.toFixed(2),"12px Arial","#fff");

			dps_text.x = 5;
			dps_amount_text.x = dps_text.getMeasuredWidth() + 5;
			dps_text.y = dps_amount_text.y = 31;

			var button_container = new createjs.Container();
			var button_border = new createjs.Shape();
			button_border.graphics.s("#fff").ss(2).f("#333").rr(0,0,80,20,5);
			if(ship.purchased){
				var button_text = new createjs.Text("Owned","12px Arial","#FFBE2C");
			}else{
				var button_text = new createjs.Text(ship.price,"12px Arial","#FFBE2C");
				button_container.cursor = "pointer";
				button_container.addEventListener("mousedown", function(event){
					confirm(event, "Do you want to pay " + ship.price + " for "+ship.name+"?", function(callback){
						$.post("/buyShip",{ship_id:ship._id},function(res){
							if(res.code > 0){
								user.setGold(res.user.gold);
								user.setShip(res.ship);
							}else{

							}
							callback();
						});
					});
				});
			}
			button_text.textAlign = "center";
			button_text.x = 40;
			button_text.y = 4;

			var name = new createjs.Text(ship.name,"12px Arial","#fff");
			name.textAlign = "center";
			name.x = 50;
			name.y = 110;

			button_container.x = 10;
			button_container.y = 130;
			button_container.addChild(button_border, button_text);

			container.x = index % 5 * 110;
			container.y = parseInt(index / 5) * 170;
			container.addChild(border, shape_container, health_text, health_amount_text, speed_text, speed_amount_text, dps_text, dps_amount_text, button_container, name);
			item_container.addChild(container);
			index++;
		});
	}

	function confirm(event, msg, callback){
		var container = new createjs.Container();
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
				stage.removeChild(container);
				stage.update();
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
			stage.removeChild(container);
			stage.update();
		});

		text.x = text.y = 10;
		border.graphics.s("#fff").ss(2).f("#000").rr(0,0,text.getMeasuredWidth() + 20,70,5);
		container.x = 320 - text.getMeasuredWidth()/2 - 10;
		container.y = 320 - 40;
		container.addChild(border, text, yes_button, no_button);
		stage.addChild(container);
		stage.update();
	}

	this.open = function(){
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