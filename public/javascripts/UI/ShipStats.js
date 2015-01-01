function ShipStats(ship){
	this.ship = ship;

	init.call(this);

	function init(){
		renderFrame.call(this);
	}

	function renderFrame(){
		var exp_bar_border = new createjs.Shape();
		exp_bar_border.graphics.beginStroke("#fff").drawRect(170, 560, 300, 8);
		stage.addChild(exp_bar_border);

		this.exp_bar = new createjs.Shape();
		this.exp_bar.graphics.beginFill("#FCFFF5").drawRect(169, 561, 298*(user.exp / user.exp_cap), 6);
		stage.addChild(this.exp_bar);
	}
}


ShipStats.prototype.renderSkillBar = function(){
	
}

ShipStats.prototype.renderExpBar = function(){
	this.exp_bar.graphics.c().beginFill("#FCFFF5").drawRect(169, 561, 298*(user.exp / user.exp_cap), 6);
}