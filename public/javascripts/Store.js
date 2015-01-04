function Store(){
	
	this.isOpen = false;
	var store = this;
	var item_container;

	init.call(this);

	function init(){
		renderStore.call(this);
	}

	function renderStore(){
		this.container = new createjs.Container();

		item_container = new createjs.Container();
		item_container.x = 160;
		item_container.y = 20;

		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").rr(10,10,120,200,10).rr(150,10,480,620,10);

		var button_border = new createjs.Shape();
		button_border.graphics.s("#fff").ss(2).f("#000").rr(0,0,100,30,5);

		var ship_button = new createjs.Container();
		ship_button.x = ship_button.y = 20;

		var ship_text = new createjs.Text("Ship","16px Arial","#fff");
		ship_text.regX = ship_text.getMeasuredWidth()/2 - 50;
		ship_text.y = 7;
		ship_button.addChild(button_border.clone(), ship_text);
		ship_button.cursor = "pointer";

		ship_button.addEventListener("mousedown", function(event){
			getItems("ship");
		});

		var weapon_button = new createjs.Container();
		weapon_button.x = 20;
		weapon_button.y = 60;

		var weapon_text = new createjs.Text("Weapon","16px Arial","#fff");
		weapon_text.regX = weapon_text.getMeasuredWidth()/2 - 50;
		weapon_text.y = 7;
		weapon_button.addChild(button_border.clone(), weapon_text);
		weapon_button.cursor = "pointer";

		weapon_button.addEventListener("mousedown", function(event){
			console.log("show weapons");
		});

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

		this.container.addChild(background, close_button, ship_button, weapon_button, item_container);
		getItems("ship");
	}

	function getItems(type){
		$.post("/getItems/",{type:type}, function(res){
			console.log("ship list");
			renderItems(res.items);
		});
	}

	function renderItems(items){
		var index = 0;
		items.forEach(function(item){
			var container = new createjs.Container();
			var border = new createjs.Shape();
			border.graphics.s("#fff").ss(2).f("#000").rr(0,0,100,160,5);

			var shape_container = new createjs.Container();
			item._shape.components.forEach(function(component){
				var shape = new createjs.Shape();
				shape.graphics.bf(loader.getResult(this.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
				shape.regX = component.crop_x + component.width / 2;
				shape.regY = component.crop_y + component.height / 2;
				shape.x = component.x + 50;
				shape.y = component.y + 80;
				shape_container.addChild(shape);
			}, item._shape);

			var health_text = new createjs.Text("Health: ","12px Arial","#FFB03B");
			var health_amount_text = new createjs.Text(item.health,"12px Arial","#fff");
			health_text.x = 5;
			health_amount_text.x = health_text.getMeasuredWidth() + 5;
			health_text.y = health_amount_text.y = 5;
			
			var speed_text = new createjs.Text("Speed: ","12px Arial","#FFB03B");
			var speed_amount_text = new createjs.Text(item.speed,"12px Arial","#fff");
			speed_text.x = 5;
			speed_amount_text.x = speed_text.getMeasuredWidth() + 5;
			speed_text.y = speed_amount_text.y = 18;
			
			var weapons_text = new createjs.Text("Weapons: ","12px Arial","#FFB03B");
			var weapons_amount_text = new createjs.Text(item.weapons,"12px Arial","#fff");
			weapons_text.x = 5;
			weapons_amount_text.x = weapons_text.getMeasuredWidth() + 5;
			weapons_text.y = weapons_amount_text.y = 31;

			var button_container = new createjs.Container();
			var button_border = new createjs.Shape();
			button_border.graphics.s("#fff").ss(2).f("#333").rr(0,0,80,20,5);
			var button_text = new createjs.Text(item.price,"12px Arial","#FFBE2C");
			button_text.textAlign = "center";
			button_text.regX = -50 + button_text.getMeasuredWidth()/2;
			button_text.y = 4;

			button_container.x = 10;
			button_container.y = 130;
			button_container.cursor = "pointer";
			button_container.addChild(button_border, button_text);

			container.x = index % 3 * 110;
			container.y = parseInt(index / 3) * 170;
			container.addChild(border, shape_container, health_text, health_amount_text, speed_text, speed_amount_text, weapons_text, weapons_amount_text, button_container);
			item_container.addChild(container);
			index++;
		});
	}
}

Store.prototype.open = function(){
	this.isOpen = true;
	stage.addChild(this.container);
	stage.update();
}

Store.prototype.close = function(){
	this.isOpen = false;
	stage.removeChild(this.container);
	stage.update();
}

Store.prototype.buy = function(item){
	if(user.gold >= item.price){
		$.post("/buyitem",{user:used._id, item:item._id},function(res){
			/*
				result: -1 not enough gold
			*/
			console.log(res);
		});
	}else{
		alert("You don't have enough gold to buy it.")
	}
}

Store.prototype.sell = function(item){

}