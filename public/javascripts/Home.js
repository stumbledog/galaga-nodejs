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
			var path;
			process._selectable.forEach(function(star){
				var clear = false;
				process._cleared.forEach(function(item){
					if(item._id == star._id) clear = true;
				});

				if(!path){
					path = new createjs.Shape();
					path.graphics.ss(2).s("#FFF0A5").mt(star.x,star.y);
				}else{
					path.graphics.lt(star.x,star.y);
				}
				var wave_count = star.waves.length;
				var container = new createjs.Container();
				container.x = star.x;
				container.y = star.y;
				var radius = star.radius;

				var star_shape = new createjs.Shape();
				star_shape.graphics
				.rf(["#fff","#333"],[0,1],radius/3,-radius/3,0,0,0,radius)
				.dc(0, 0 , radius);
				star_shape.cursor = "pointer";

				var outline = new createjs.Shape();
				outline.graphics.f(clear?"#468966":"#FFF0A5").dc(0, 0 , radius + 3);

				var text = new createjs.Text(star.name, "12px Arial", "#ffffff");
				text.x = radius + 5;

				container.addChild(outline, star_shape, text);
				stage.addChild(container);

				container.addEventListener("rollover", function(event){
					if(!current_menu || !current_menu.isOpen()){
						container.scaleX = container.scaleY = 1.2;
					}
				});

				container.addEventListener("rollout", function(event){
					if(!current_menu || !current_menu.isOpen()){
						container.scaleX = container.scaleY = 1;
					}
				});

				container.addEventListener("mousedown", function(event){
					if(!current_menu || !current_menu.isOpen()){
						selected_star = star._id;
						balance_controller.selectStar(selected_star);
					}
				});
			stage.addChild(path);
			stage.swapChildren(stage.children[0],stage.children[stage.children.length-1]);
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