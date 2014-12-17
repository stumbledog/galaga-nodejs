(function Home(){
	var image_loader, stage, game_panel_container, total_exp, selected_star;
	var difficulty = [1,1,1,1,1];

	init();

	function init(){
		var manifest = [
			{src:"./assets/images/Button64.png", id:"button"},
			{src:"./assets/images/Ships64.png", id:"ship"},
		];
		stage = new createjs.Stage("home");
		stage.enableMouseOver(10);

		image_loader = new createjs.LoadQueue(false);
		image_loader.addEventListener("complete", handleLoadComplete);
		image_loader.loadManifest(manifest);
	}

	function handleLoadComplete(){
		loadGalaxy();
		initGamePanel();
	}

	function loadGalaxy(){
		$.get("/galaxy", function(res){
			res.processes.forEach(function(process){

				console.log(process);

				var wave_count = process._star._wave.length;

				var star = process._star;
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
				text.x = radius+5;

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
					stage.addChild(game_panel_container);
					stage.update();
				});
			});
			stage.update();
		});
	}

	function initGamePanel(){
		game_panel_container = new createjs.Container();
		var game_panel = new createjs.Shape();
		var game_start_button = new createjs.Bitmap(image_loader.getResult("button"));	//638,1172 702,1236
		var game_cancel_button = new createjs.Bitmap(image_loader.getResult("button"));	//638,1094 702,1158
		total_exp = new createjs.Text("Total exp multiplier: x1","16px Arial","#fff");

		game_start_button.sourceRect = new createjs.Rectangle(638,1172,64,64);
		game_cancel_button.sourceRect = new createjs.Rectangle(638,1094,64,64);

		game_start_button.regX = game_start_button.regY = game_cancel_button.regX = game_cancel_button.regY = 32
		game_start_button.y = game_cancel_button.y = 140;
		game_start_button.x = -64;
		game_cancel_button.x = 64;

		game_panel.graphics.s("#fff").ss(1).f("#333").rr(-200, -200, 400, 400, 10);

		game_start_button.cursor = game_cancel_button.cursor = "pointer";

		total_exp.x = -20;
		total_exp.y = 82;

		game_panel_container.addChild(game_panel, game_start_button, game_cancel_button, total_exp);
		game_panel_container.x = game_panel_container.y = 320;

		game_start_button.addEventListener("mousedown", function(event){
			gameStart();
//			stage.removeChild(game_panel_container);
			stage.update();
		});

		game_cancel_button.addEventListener("mousedown", function(event){
			stage.removeChild(game_panel_container);
			stage.update();
		});

		createBalaceController("Enermy\nNumber", 0);
		createBalaceController("Enermy\nHealth", 1);
		createBalaceController("Enermy\nDamage", 2);
		createBalaceController("Wave\nNumber", 3);
		createBalaceController("Nothing", 4);
	}

	function createBalaceController(title, index){
		var container = new createjs.Container();
		var title = new createjs.Text(title,  "16px Arial", "#ffffff");
		var exp = new createjs.Text("x1",  "16px Arial", "#ffffff");

		y = -120 + 40 * index;

		title.x = -180;
		title.y = y + 1;
		exp.x = 120;
		exp.y = y + 9;
		
		container.addChild(title, exp);

		var bars = [];
		for(var i=0;i<10;i++){
			var bar = new createjs.Shape();
			bar.graphics.s("#000").ss(1).f(i == 0 ? "#fff" : "#666").rr(0, 0, 16, 32, 2);
			bar.x = i * 20 - 100;
			bar.y = y;
			bar.index = i;
			bar.cursor = "pointer";
			bars.push(bar);
			container.addChild(bar);
		}

		bars.forEach(function(bar){
			bar.addEventListener("mousedown", function(event){
				for(var i=0;i<10;i++){
					bars[i].graphics.f(i<=bar.index?"#fff":"#666").rr(0, 0, 16, 32, 2);
				}
				exp.text = "x" + (bar.index + 1);
				difficulty[index] = bar.index + 1;
				var total = difficulty.reduce(function(previous, current){
					return previous*current;
				},1 );
				total_exp.text = "Total exp multiplier: x"+total;
				stage.update();
			});
		});

		game_panel_container.addChild(container);
	}

	function gameStart(){
		$("input#star").val(selected_star);
		$("input#difficulty").val(difficulty);
		$("form#game").submit();
	}

})();