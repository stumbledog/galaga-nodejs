var Home = (function(){

	var instance;

	function init(data){
		var selected_star, balance_controller, store, hangar, mastery, current_menu, user;
		var data = data;
		var difficulty = data.difficulty.split(",");
		var process = data.process;

		var manifest = [
			{src:"./assets/images/Components64.png", id:"components"},
			{src:"./assets/images/Ships64.png", id:"ships"},
			{src:"./assets/images/Button64.png", id:"button"},
		];
		var stage = new createjs.Stage("home");
		stage.enableMouseOver(10);

		var loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete", handleLoadComplete);
		loader.loadManifest(manifest);

		function handleLoadComplete(){
			user = User.getInstance(data.user, data.ship, "home");
			store = new Store();
			hangar = new Hangar();
			mastery = new Mastery();
			balance_controller = new BalanceController(null, difficulty, "home");
			renderGalaxy();
			initButtons();
			createjs.Ticker.addEventListener("tick", tick);
			createjs.Ticker.setFPS(30);
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
					if(!current_menu || !current_menu.isOpen()){
						container.scaleX = container.scaleY = 1.2;
						//stage.addChild(tooltip_container);
					}
				});

				container.addEventListener("rollout", function(event){
					if(!current_menu || !current_menu.isOpen()){
						container.scaleX = container.scaleY = 1;
						//stage.removeChild(tooltip_container);
					}
				});

				container.addEventListener("mousedown", function(event){
					if(!current_menu || !current_menu.isOpen()){
						selected_star = star._id;
						balance_controller.selectStar(selected_star);
					}
				});
			});
		}

		function initButtons(){
			renderButton("Hangar", 160, 600, hangar);
			renderButton("Store", 260, 600, store);
			renderButton("Mastery", 360, 600, mastery);
			renderButton("Map", 460, 600);
		}

		function renderButton(text, x, y, menu){
			var container = new createjs.Container();
			container.x = x;
			container.y = y;
			container.cursor = "pointer";
			var text_outline = new createjs.Text(text, "bold 24px Arial", "#ffffff");
			text_outline.textAlign = "center";
			text_outline.textBaseline = "middle";
			text_outline.outline = 5;

			var text = text_outline.clone();
			text.color = "#ff7700";
			text.outline = false;

			container.addEventListener("rollover", function(event){
					container.scaleX = container.scaleY = 1.2;
			});

			container.addEventListener("rollout", function(event){
					container.scaleX = container.scaleY = 1.0;
			});

			container.addEventListener("mousedown", function(event){
				container.scaleX = container.scaleY = 1.0;
				if(current_menu){
					current_menu.close();
				}

				if(menu){
					menu.open();
					current_menu = menu;					
				}
			});

			container.addChild(text_outline, text);
			stage.addChild(container);
		}

		function tick(){
			stage.update();
		}

		return{
			getStage:function(){
				return stage;
			},
			getLoader:function(){
				return loader;
			}
		}
	}

	return {
		getInstance:function(data){
			if(!instance){
				instance = init.call(this, data);
			}
			return instance;
		}
	}
})();