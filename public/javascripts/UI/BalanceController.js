function BalanceController(star, difficulty, type){
	var total_exp;
	var self = this;
	this.star = star;
	this.difficulty = difficulty || [1,1,1,1,1];
	this.bonus = self.difficulty.reduce(function(previous, current){
		return previous * Math.sqrt(current);
	},1 );

	if(type === "home"){
		var stage = Home.getInstance().getStage();
		var loader = Home.getInstance().getLoader();
	}else if(type === "game"){
		var stage = Game.getInstance().getStage();
		var loader = Game.getInstance().getLoader();
	}

	init.call(this);

	function init(){
		createForm();
		render.call(this);
	}

	function createForm(){
		$form = $('<form id="game" method="POST" action="/game"></form>');
		$form.append('<input id="star" name="star" type="hidden"/>');
		$form.append('<input id="difficulty" name="difficulty" type="hidden"/>');
		$form.append('<input id="bonus" name="bonus" type="hidden"/>');
		$('body').append($form);
	}

	function render(){
		this.game_panel_container = new createjs.Container();
		var game_panel = new createjs.Shape();
		var game_start_button = new createjs.Bitmap(loader.getResult("button"));	//638,1172 702,1236
		var game_cancel_button = new createjs.Bitmap(loader.getResult("button"));	//638,1094 702,1158
		var title = new createjs.Text("Select Difficulty", "32px Arial","#fff");
		total_exp = new createjs.Text("Total exp & gold multiplier: x"+this.bonus.toFixed(2),"16px Arial","#fff");

		game_start_button.sourceRect = new createjs.Rectangle(638,1172,64,64);
		game_cancel_button.sourceRect = new createjs.Rectangle(638,1094,64,64);

		game_start_button.regX = game_start_button.regY = game_cancel_button.regX = game_cancel_button.regY = 32
		game_start_button.y = game_cancel_button.y = 140;
		game_start_button.x = -64;
		game_cancel_button.x = 64;
		title.regX = title.getMeasuredWidth() / 2;
		title.y = -180;

		game_panel.graphics.s("#fff").ss(1).f("#333").rr(-200, -200, 400, 400, 10);

		game_start_button.cursor = game_cancel_button.cursor = "pointer";

		total_exp.x = -50;
		total_exp.y = 82;

		this.game_panel_container.addChild(game_panel, game_start_button, game_cancel_button, total_exp, title);
		this.game_panel_container.x = this.game_panel_container.y = 320;

		game_start_button.addEventListener("mousedown", function(event){
			gameStart.call(self);
			stage.update();
		});

		game_cancel_button.addEventListener("mousedown", function(event){
			self.hide();
			stage.update();
		});

		createBalaceController.call(this, "Enermy\nNumber", 0);
		createBalaceController.call(this, "Enermy\nHealth", 1);
		createBalaceController.call(this, "Enermy\nDamage", 2);
		createBalaceController.call(this, "Enermy\nFirerate", 3);
		createBalaceController.call(this, "Bullet\nSpeed", 4);
	}

	function createBalaceController(title, index){
		var container = new createjs.Container();
		var title = new createjs.Text(title,  "16px Arial", "#ffffff");
		var exp = new createjs.Text("x"+this.difficulty[index],  "16px Arial", "#ffffff");

		y = -120 + 40 * index;

		title.x = -180;
		title.y = y + 1;
		exp.x = 120;
		exp.y = y + 9;
		
		container.addChild(title, exp);

		var bars = [];
		for(var i=0;i<10;i++){
			var bar = new createjs.Shape();
			bar.graphics.s("#000").ss(1).f(i < self.difficulty[index] ? "#fff" : "#666").rr(0, 0, 16, 32, 2);
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
				self.difficulty[index] = bar.index + 1;
				self.bonus = self.difficulty.reduce(function(previous, current){
					return previous * Math.sqrt(current);
				},1 );
				total_exp.text = "Total exp multiplier: x"+self.bonus.toFixed(2);
				stage.update();
			});
		});

		this.game_panel_container.addChild(container);
	}

	function gameStart(){
		$("input#star").val(this.star);
		$("input#difficulty").val(this.difficulty);
		$("input#bonus").val(this.bonus);
		$("form#game").submit();
	}

	this.selectStar = function(star){
		this.star = star;
		this.show();		
	}

	this.show = function(){
		stage.addChild(this.game_panel_container);
	}

	this.hide = function(){
		stage.removeChild(this.game_panel_container);
	}

}