(function Home(){
	var game_panel_container, total_exp, selected_star, total, balance_controller;
	var difficulty = [1,1,1,1,1];

	init();

	function init(){
		var manifest = [
			{src:"./assets/images/Button64.png", id:"button"},
			{src:"./assets/images/Ships64.png", id:"ship"},
		];
		stage = new createjs.Stage("home");
		stage.enableMouseOver(10);

		loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete", handleLoadComplete);
		loader.loadManifest(manifest);
	}

	function handleLoadComplete(){
		loadGalaxy();
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

				if(process.clear){
					star._next.forEach(function(path){
						var line = new createjs.Shape();
						line.graphics.s('#fff').mt(star.x, star.y).lt(path.x, path.y);
						stage.addChild(line);
					});
				}else{
					var over = new createjs.Shape();
					over.graphics.f("#fff").dc(0, 0 , radius+2);
					container.addChild(over);
				}

				container.addChild(star_shape, text);
				stage.addChild(container);

				var tooltip_container = new createjs.Container();
				var tooltip_text = new createjs.Text(wave_count+" waves", "16px Arial", "#ffffff");

				tooltip_container.x = star.x + radius + 5;
				tooltip_container.y = star.y - radius - 10;

				tooltip_container.addChild(tooltip_text);

				container.addEventListener("rollover", function(event){
					container.scaleX = container.scaleY = 1.2;
					stage.addChild(tooltip_container);
					stage.update();
				});

				container.addEventListener("rollout", function(event){
					container.scaleX = container.scaleY = 1;
					stage.removeChild(tooltip_container);
					stage.update();
				});

				container.addEventListener("mousedown", function(event){
					selected_star = star._id;
					balance_controller.selectStar(selected_star);
					stage.update();
				});
			});

			stage.update();
		});
	}
})();