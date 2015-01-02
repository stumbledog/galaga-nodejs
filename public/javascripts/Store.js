function Store(){
	
	this.isOpen = false;
	var store = this;
	
	init.call(this);

	function init(){
		renderStore.call(this);
	}

	function renderStore(){
		this.container = new createjs.Container();

		var item_container = new createjs.Container();
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
			console.log("show ships");
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
		getItems("ship", function(){
			console.log("ship list");
		});
	}

	function getItems(type, callback){
		$.post("/getItems/",{type:type}, function(res){
			callback();
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