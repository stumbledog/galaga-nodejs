function Home(user){
	var selected_star, balance_controller, store;
	var difficulty = [1,1,1,1,1];
	this.user = new User(user);
	var home = this;

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
		loadGalaxy();
		home.user.renderGold();
		home.user.renderLevel();
		home.user.renderShip();
		initButtons();
		store = new Store();
		balance_controller = new BalanceController();
	}

	function loadGalaxy(){
		$.get("/galaxy", function(res){
			var process = res.process;
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

				var text = new createjs.Text(star.name, "14px Arial", "#ffffff");
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
		});
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
			if(!store.isOpen){
				store_button.scaleX = store_button.scaleY = 1.2;
				stage.update();
			}
		});

		store_button.addEventListener("rollout", function(event){
			if(!store.isOpen){
				store_button.scaleX = store_button.scaleY = 1.0;
				stage.update();
			}
		});

		store_button.addEventListener("mousedown", function(event){
			if(!store.isOpen){
				store_button.scaleX = store_button.scaleY = 1.0;
				store.open();
				stage.update();
			}
		});

		stage.addChild(store_button);
	}
}