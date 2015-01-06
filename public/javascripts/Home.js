function Home(data){
	var selected_star, balance_controller, store, hangar;
	var difficulty = [1,1,1,1,1];
	var home = this;
	var user = User.getInstance(data.user, data.ship, this);
	var process = data.process;

	init.call(this);

	function init(){
		var manifest = [
            {src:"./assets/images/Components64.png", id:"components"},
			{src:"./assets/images/Ships64.png", id:"ships"},
			{src:"./assets/images/Button64.png", id:"button"},
		];
		stage = new createjs.Stage("home");
		stage.enableMouseOver(10);

		loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete", handleLoadComplete);
		loader.loadManifest(manifest);
	}

	function handleLoadComplete(){
		
		renderGalaxy();
		user.render();
		initButtons();
		store = new Store();
		hangar = new Hangar();
		balance_controller = new BalanceController();
	}

	function renderGalaxy(){
		process._selectable.forEach(function(star){
			var wave_count = star._wave.length;
			var container = new createjs.Container();
			container.x = star.x;
			container.y = star.y;
			var radius = star.radius;

			var star_shape = new createjs.Shape();
			star_shape.graphics
			.rf(["#fff","#333"],[0,1],radius/3,-radius/3,0,0,0,radius)
			.dc(0, 0 , radius);
			star_shape.cursor = "pointer";

			var text = new createjs.Text(star.name, "12px Arial", "#ffffff");
			text.x = radius + 5;				

			container.addChild(star_shape, text);
			stage.addChild(container);

			var tooltip_container = new createjs.Container();
			var tooltip_text = new createjs.Text(wave_count+" waves", "16px Arial", "#ffffff");

			tooltip_container.x = star.x + radius + 5;
			tooltip_container.y = star.y - radius - 10;

			tooltip_container.addChild(tooltip_text);

			container.addEventListener("rollover", function(event){
				if(!store.isOpen){
					container.scaleX = container.scaleY = 1.2;
					//stage.addChild(tooltip_container);
					stage.update();
				}
			});

			container.addEventListener("rollout", function(event){
				if(!store.isOpen){
					container.scaleX = container.scaleY = 1;
					//stage.removeChild(tooltip_container);
					stage.update();
				}
			});

			container.addEventListener("mousedown", function(event){
				if(!store.isOpen){
					selected_star = star._id;
					balance_controller.selectStar(selected_star);
					stage.update();
				}
			});
		});
		stage.update();
	}

	function initButtons(){
		var store_button = new createjs.Shape();
		store_button.graphics.bf(loader.getResult("button")).drawRect(638,630,63,66);
		store_button.regX = 670;
		store_button.regY = 663;
		store_button.x = 320;
		store_button.y = 600;
		store_button.cursor = "pointer";

		store_button.addEventListener("rollover", function(event){
				store_button.scaleX = store_button.scaleY = 1.2;
				stage.update();
		});

		store_button.addEventListener("rollout", function(event){
				store_button.scaleX = store_button.scaleY = 1.0;
				stage.update();
		});

		store_button.addEventListener("mousedown", function(event){
				store_button.scaleX = store_button.scaleY = 1.0;
				store.open();
				stage.update();
		});

		var hangar_button = new createjs.Shape();
		hangar_button.graphics.bf(loader.getResult("button")).drawRect(638,257,63,66);
		hangar_button.regX = 670;
		hangar_button.regY = 290;
		hangar_button.x = 240;
		hangar_button.y = 600;
		hangar_button.cursor = "pointer";

		hangar_button.addEventListener("rollover", function(event){
				hangar_button.scaleX = hangar_button.scaleY = 1.2;
				stage.update();
		});

		hangar_button.addEventListener("rollout", function(event){
				hangar_button.scaleX = hangar_button.scaleY = 1.0;
				stage.update();
		});

		hangar_button.addEventListener("mousedown", function(event){
				hangar_button.scaleX = hangar_button.scaleY = 1.0;
				hangar.open();
				stage.update();
		});

		stage.addChild(store_button, hangar_button);
		stage.update();
	}
}