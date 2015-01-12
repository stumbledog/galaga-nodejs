function BalanceController(star, difficulty, type){
	var multiplier, multiplier_outline;
	var star = star;
	var difficulty = difficulty || [1,1,1,1,1];
	var main_container;
	var bonus = difficulty.reduce(function(previous, current){
		return previous * Math.sqrt(current);
	},1 );

	if(type === "home"){
		var stage = Home.getInstance().getStage();
		var loader = Home.getInstance().getLoader();
	}else if(type === "game"){
		var stage = Game.getInstance().getStage();
		var loader = Game.getInstance().getLoader();
	}

	init();

	function init(){
		createForm();
		render();
	}

	function createForm(){
		$form = $('<form id="game" method="POST" action="/game"></form>');
		$form.append('<input id="star" name="star" type="hidden"/>');
		$form.append('<input id="difficulty" name="difficulty" type="hidden"/>');
		$form.append('<input id="bonus" name="bonus" type="hidden"/>');
		$('body').append($form);
	}

	function render(){
		main_container = new createjs.Container();
		main_container.x = main_container.y = 320;

		var game_panel = new createjs.Shape();
		var game_start_button = new createjs.Bitmap(loader.getResult("button"));
		var game_cancel_button = new createjs.Bitmap(loader.getResult("button"));
		var title_outline = new createjs.Text("Select Difficulty", "bold 32px Arial","#fff");
		title_outline.y = -180;
		title_outline.textAlign = "center";
		title_outline.outline = 5;
		title = title_outline.clone();
		title.outline = false;
		title.color = "#468966";

		var total_exp_outline = new createjs.Text("Exp & Gold multiplier: x","16px Arial","#000");
		total_exp_outline.x = 0;
		total_exp_outline.y = 82;
		total_exp_outline.textAlign = "center";
		total_exp_outline.outline = 5;

		var total_exp = total_exp_outline.clone();
		total_exp.outline = false;
		total_exp.color = "#FFB03B";

		multiplier_outline = new createjs.Text(bonus.toFixed(2),"16px Arial","#000");
		multiplier_outline.x = 90;
		multiplier_outline.y = 82;
		multiplier_outline.outline = 5;

		multiplier = multiplier_outline.clone();
		multiplier.outline = false;
		multiplier.color = "#fff";

		game_start_button.sourceRect = new createjs.Rectangle(638,1172,64,64);
		game_cancel_button.sourceRect = new createjs.Rectangle(638,1094,64,64);

		game_start_button.regX = game_start_button.regY = game_cancel_button.regX = game_cancel_button.regY = 32
		game_start_button.y = game_cancel_button.y = 140;
		game_start_button.x = -64;
		game_cancel_button.x = 64;

		game_panel.graphics.s("#fff").ss(1).f("#333").rr(-200, -200, 400, 400, 10);
		game_start_button.cursor = game_cancel_button.cursor = "pointer";

		main_container.addChild(game_panel, game_start_button, game_cancel_button, total_exp_outline, total_exp, multiplier_outline, multiplier, title_outline, title);

		game_start_button.addEventListener("mousedown", function(event){
			public.gameStart();
			stage.update();
		});

		game_cancel_button.addEventListener("mousedown", function(event){
			public.hide();
			stage.update();
		});

		createBalaceController("Enemy\nNumber", 0);
		createBalaceController("Enemy\nHealth", 1);
		createBalaceController("Enemy\nDamage", 2);
		createBalaceController("Enemy\nFirerate", 3);
		createBalaceController("Bullet\nSize", 4);
	}

	function createBalaceController(title, index){
		var y = -120 + 40 * index;
		var container = new createjs.Container();

		var title_outline = new createjs.Text(title,  "16px Arial", "#000");
		title_outline.x = -180;
		title_outline.y = y + 1;
		title_outline.outline = 4;
		title = title_outline.clone();
		title.outline = false;
		title.color = "#FFB03B";

		var exp_outline = new createjs.Text("x"+difficulty[index],  "16px Arial", "#000");
		exp_outline.x = 120;
		exp_outline.y = y + 9;
		exp_outline.outline = 4;
		var exp = exp_outline.clone();
		exp.outline = false;
		exp.color = "#fff";

		
		container.addChild(title_outline, title, exp_outline, exp);

		var bars = [];
		for(var i=0;i<40;i++){
			var bar = new createjs.Shape();
			bar.graphics.s("#000").ss(1).f(i < difficulty[index] ? "#fff" : "#666").rr(0, 0, 4, 32, 2);
			bar.x = i * 5 - 100;
			bar.y = y;
			bar.index = i;
			bar.cursor = "pointer";
			bars.push(bar);
			container.addChild(bar);
		}

		bars.forEach(function(bar){
			bar.addEventListener("mousedown", function(event){
				for(var i=0;i<40;i++){
					bars[i].graphics.f(i<=bar.index?"#fff":"#666").rr(0, 0, 4, 32, 2);
				}
				exp_outline.text = "x" + (bar.index + 1);
				exp.text = "x" + (bar.index + 1);
				difficulty[index] = bar.index + 1;
				bonus = difficulty.reduce(function(previous, current){
					return previous * Math.sqrt(current);
				},1 );
				multiplier.text = bonus.toFixed(2);
				multiplier_outline.text = bonus.toFixed(2);
				stage.update();
			});
		});

		main_container.addChild(container);
	}

	var public = {
		gameStart:function(){
			$("input#star").val(star);
			$("input#difficulty").val(difficulty);
			$("input#bonus").val(bonus);
			$("form#game").submit();
		},
		selectStar:function(selected_star){
			star = selected_star;
			this.show();
		},
		show:function(){
			stage.addChild(main_container);
		},
		hide:function(){
			stage.removeChild(main_container);
		}
	}

	return public;
}