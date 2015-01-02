function ShipStats(){
	init.call(this);

	function init(){
		//initFrame.call(this);
		initHealthBar.call(this);
		//initPsychicBar.call(this);
		initExpBar.call(this);
		initEvent.call(this);
	}

	function initFrame(){
		this.frame = new createjs.Shape();
		this.frame.graphics
		.ss(4).ls(["#F7F7F7", "#8594AE"], [0,1], 170,540,470,564).dr(168,538,304,28);
		stage.addChild(this.frame);
	}

	function initHealthBar(){
		this.health_bar_border = new createjs.Shape();
		this.health_bar_border.graphics.beginStroke("#fff").drawRect(169, 612, 302, 14);
		this.health_bar = new createjs.Shape();
		this.health_bar.graphics.lf(["#61BF23","#39B52F"], [0, 1],320,613,320,626).dr(170, 613, 300 * (ship.health / ship.health_max), 12);
		this.damage_bar = new createjs.Shape();
		this.damage_bar.graphics.lf(["#D92525","#73121A"], [0, 1],320,613,320,626).dr(170, 613, 300, 12);
		this.health_text = new createjs.Text(ship.health + " / " + ship.health_max,"10px Arial","#fff");
		this.health_text.y = 614;
		this.health_text.x = 320 - this.health_text.getMeasuredWidth()/2;
		stage.addChild(this.health_bar_border, this.damage_bar, this.health_bar, this.health_text);
	}

	function initPsychicBar(){
		this.psychic_bar = new createjs.Shape();
		this.psychic_bar.graphics.lf(["#3472FF","#2311CC"], [0, 1],170,552,470,552).dr(170, 552, 300 * (ship.psychic / ship.psychic_max), 12);
		this.psychic_text = new createjs.Text(ship.psychic + " / " + ship.psychic_max,"10px Arial","#fff");
		this.psychic_text.y = 553;
		this.psychic_text.x = 320 - this.psychic_text.getMeasuredWidth()/2;
		stage.addChild(this.psychic_bar, this.psychic_text);
	}

	function initExpBar(){
		this.exp_bar_border = new createjs.Shape();
		this.exp_bar_border.graphics.beginStroke("#fff").drawRect(169, 626, 302, 14);
		this.exp_bar = new createjs.Shape();
		this.exp_bar.graphics.beginFill("#FCFFF5").drawRect(170, 627, 300 * (user.exp / user.exp_cap), 12);
		this.exp_text = new createjs.Text("Level " + user.level + " Exp " + (user.exp / user.exp_cap * 100).toFixed(2)+"%","10px Arial","#888");
		this.exp_text.y = 628;
		this.exp_text.x = 320 - this.exp_text.getMeasuredWidth()/2;
		stage.addChild(this.exp_bar_border, this.exp_bar, this.exp_text);
	}

	function initEvent(){
		this.exp_bar_border.addEventListener("rollover", function(event){
			console.log("asd");
		});
	}
}


ShipStats.prototype.renderSkillBar = function(){
	
}

ShipStats.prototype.renderHealthBar = function(){
	this.health_bar.graphics.c().lf(["#61BF23","#39B52F"], [0, 1],320,613,320,626).dr(170, 613, 300 * (ship.health / ship.health_max), 12);
	this.health_text.text = ship.health + " / " + ship.health_max;
}

ShipStats.prototype.renderExpBar = function(){
	this.exp_bar.graphics.c().beginFill("#FCFFF5").drawRect(170, 627, 300*(user.exp / user.exp_cap), 12);
	this.exp_text.text = "Level " + user.level + " Exp " + (user.exp / user.exp_cap * 100).toFixed(2)+"%";
}