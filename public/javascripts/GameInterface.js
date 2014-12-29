function GameInterface(){

	init.call(this);

	function init(){
		renderFrame.call(this);
	}

	function renderFrame(){
		var exp_bar_border = new createjs.Shape();
		exp_bar_border.graphics.beginStroke("#fff").drawRect(170, 560, 300, 8);
		stage.addChild(exp_bar_border);

		this.exp_bar = new createjs.Shape();
		this.exp_bar.graphics.beginFill("#FCFFF5").drawRect(169, 561, 298*(ship.ship.exp/ship.ship.exp_cap), 6);
		stage.addChild(this.exp_bar);
	}
}

GameInterface.prototype.renderSkillBar = function(){
	
}

GameInterface.prototype.renderExpBar = function(){
	this.exp_bar.graphics.c().beginFill("#FCFFF5").drawRect(169, 561, 298*(ship.ship.exp/ship.ship.exp_cap), 6);
}

