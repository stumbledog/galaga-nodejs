

function ShipStats(){
	var health_bar, damage_bar, psychic_bar, exp_bar, health_text, psychic_text, exp_text;
	var stage = Game.getInstance().getStage();

	init();

	function init(){
		//initFrame.call(this);
		initHealthBar();
		//initPsychicBar.call(this);
		//initExpBar.call(this);
		//initEvent.call(this);
	}

	function initFrame(){
		var frame = new createjs.Shape();
		frame.graphics
		.ss(4).ls(["#F7F7F7", "#8594AE"], [0,1], 170,540,470,564).dr(168,538,304,28);
		stage.addChild(frame);
	}

	function initHealthBar(){
		var health_bar_border = new createjs.Shape();
		health_bar_border.graphics.beginStroke("#fff").drawRect(169, 612, 302, 14);
		health_bar = new createjs.Shape();
		health_bar.graphics.lf(["#61BF23","#39B52F"], [0, 1],320,613,320,626).dr(170, 613, 300 * (ship.getHealth() / ship.getHealthMax()), 12);
		damage_bar = new createjs.Shape();
		damage_bar.graphics.lf(["#D92525","#73121A"], [0, 1],320,613,320,626).dr(170, 613, 300, 12);
		health_text = new createjs.Text(ship.getHealth() + " / " + ship.getHealthMax(),"10px Arial","#fff");
		health_text.y = 614;
		health_text.x = 320 - health_text.getMeasuredWidth()/2;
		stage.addChild(health_bar_border, damage_bar, health_bar, health_text);
	}

	function initPsychicBar(){
		psychic_bar = new createjs.Shape();
		psychic_bar.graphics.lf(["#3472FF","#2311CC"], [0, 1],170,552,470,552).dr(170, 552, 300 * (ship.psychic / ship.psychic_max), 12);
		psychic_text = new createjs.Text(ship.psychic + " / " + ship.psychic_max,"10px Arial","#fff");
		psychic_text.y = 553;
		psychic_text.x = 320 - psychic_text.getMeasuredWidth()/2;
		stage.addChild(psychic_bar, psychic_text);
	}

	function initExpBar(){
		var user = User.getInstance();
		exp_bar_border = new createjs.Shape();
		exp_bar_border.graphics.beginStroke("#fff").drawRect(169, 626, 302, 14);
		exp_bar = new createjs.Shape();
		exp_bar.graphics.beginFill("#FCFFF5").drawRect(170, 627, 300 * (user.exp / user.exp_cap), 12);
		exp_text = new createjs.Text("Level " + user.level + " Exp " + (user.exp / user.exp_cap * 100).toFixed(2)+"%","10px Arial","#888");
		exp_text.y = 628;
		exp_text.x = 320 - exp_text.getMeasuredWidth()/2;
		stage.addChild(exp_bar_border, exp_bar, exp_text);
	}

	function initEvent(){
		exp_bar_border.addEventListener("rollover", function(event){
			console.log("asd");
		});
	}

	this.renderSkillBar = function(){

	}

	this.renderHealthBar = function(health, max){
		health_bar.graphics.c().lf(["#61BF23","#39B52F"], [0, 1],320,613,320,626).dr(170, 613, 300 * (health / max), 12);
		health_text.text = health + " / " + max;
	}

	this.renderExpBar = function(exp, cap){
		exp_bar.graphics.c().beginFill("#FCFFF5").drawRect(170, 627, 300*(user.exp / user.exp_cap), 12);
		exp_text.text = "Level " + user.level + " Exp " + (user.exp / user.exp_cap * 100).toFixed(2)+"%";	
	}
}