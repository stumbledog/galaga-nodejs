function Game(star, ship, user, difficulty, bonus){
    var stars = [], enermies = [];
    var gold, exp, lvl;
    game = this;    
    this.ship = ship;
    this.star = star;
    this.difficulty = difficulty.split(",");
    this.bonus = bonus;

	this.total_damage_dealt = 0;
	this.largest_damage_dealt = 0;
	this.total_damage_taken = 0;
	this.largest_damage_taken = 0;
	this.enermy_destoryed = 0;
	this.total_exp_gained = 0;
	this.total_gold_earned = 0;

    init.call(this);

    function init(){
        stage = new createjs.Stage("game");
        stage.enableMouseOver(10);
        var manifest = [
            {src:"./assets/images/Components64.png", id:"components"},
            {src:"./assets/images/Items64.png", id:"items"},
            {src:"./assets/images/Button64.png", id:"button"},
            {src:"./assets/images/Ships64.png", id:"ships"},
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", this.handleLoadComplete);
        loader.loadManifest(manifest);

        this.pause_text = new createjs.Text("PAUSED\nPress 'P' to resume", "bold 24px Arial", "#FFFFFF");
        this.pause_text.x = stage.canvas.width/2;
        this.pause_text.y = stage.canvas.height/2;
        this.pause_text.textAlign = "center";
        this.pause_text.textBaseline = "alphabetic";
    }
}


Game.prototype.handleKeyDown = function(event){
    switch(event.keyCode){
        case 73:
            return false;
        case 80:
            game.pause();
            return false;
        case 86:
        	game.victory();
        	return false;
        default:
            ship.keyDown(event.keyCode);
    }
}

Game.prototype.handleKeyUp = function(event){
    ship.keyUp(event.keyCode);
}

Game.prototype.initEventHandler = function(){
	document.onkeydown = this.handleKeyDown;
	document.onkeyup = this.handleKeyUp;
	stage.on("stagemousemove", function(event){
		ship.mouseMove(event);
	});
	stage.on("stagemousedown", function(event){
		ship.mouseDown(event);
	});
	stage.on("stagemouseup", function(event){
		ship.mouseUp(event);
	});
}

Game.prototype.handleLoadComplete = function(){
	effect = new Effect();
	user = new User(this.user);
	ship = new Ship(this.ship);
	wave = new Wave(this.star._wave);
	game.balance_controller = new BalanceController(1, game.difficulty);
	ship_stats = new ShipStats();
	createjs.Ticker.addEventListener("tick", game.tick);
	createjs.Ticker.setFPS(30);
	game.initEventHandler();
}

Game.prototype.pause = function(){
	if(createjs.Ticker.getPaused()){
		stage.removeChild(this.pause_text);
		createjs.Ticker.setPaused(false);
	}else{
		stage.addChild(this.pause_text);
		createjs.Ticker.setPaused(true);
	}
}

Game.prototype.renderGameResultPanel = function(title){
	this.panel_container = new createjs.Container();
	var panel = new createjs.Shape();
	var restart_button = new createjs.Bitmap(loader.getResult("button"));
	var map_button = new createjs.Bitmap(loader.getResult("button"));
	var text = new createjs.Text(title,"32px Arial","#fff");
	var restart_text = new createjs.Text("Restart this stage","16px Arial","#fff");
	var map_text = new createjs.Text("Return to the map","16px Arial","#fff");

	this.panel_container.x = this.panel_container.y = 320;
	panel.graphics.s("#fff").ss(1).f("#333").rr(-200, -200, 400, 400, 10);
	restart_button.sourceRect = new createjs.Rectangle(638,1324,64,64);
	map_button.sourceRect = new createjs.Rectangle(638,1550,64,64);

	restart_button.regX = restart_button.regY = map_button.regX = map_button.regY = 32;
	restart_button.x = 64;
	map_button.x = -64;
	restart_button.y = map_button.y = 140;
	restart_button.cursor = map_button.cursor = "pointer";
	text.regX = text.getMeasuredWidth()/2;
	text.y = -180;
	restart_text.x = 0;
	map_text.x = -130;
	restart_text.y = map_text.y = 180;

	restart_button.addEventListener("rollover", function(event){
		restart_button.scaleX = restart_button.scaleY = 1.2;
		game.panel_container.addChild(restart_text);
		stage.update();
	});

	restart_button.addEventListener("rollout", function(event){
		restart_button.scaleX = restart_button.scaleY = 1;
		game.panel_container.removeChild(restart_text);
		stage.update();
	});

	restart_button.addEventListener("mousedown", function(event){
		game.balance_controller.show();
	});

	map_button.addEventListener("rollover", function(event){
		map_button.scaleX = map_button.scaleY = 1.2;
		game.panel_container.addChild(map_text);
		stage.update();
	});

	map_button.addEventListener("rollout", function(event){
		map_button.scaleX = map_button.scaleY = 1;
		game.panel_container.removeChild(map_text);
		stage.update();
	});

	map_button.addEventListener("mousedown", function(event){
		window.location.replace("/");
	});

	this.panel_container.addChild(panel, restart_button, map_button, text);

	this.getStatistic().forEach(function(item){
		var text = new createjs.Text(item.name + ": " + item.value.toFixed(0), "16px Arial","#fff");
		text.x = -160;
		text.y = -120 + 30 * item.index;
		this.panel_container.addChild(text);
	}, this);

	stage.addChild(this.panel_container);
	stage.update();
}

Game.prototype.victory = function(){
	var data = {level:user.level, exp:user.exp, gold:user.gold, star:this.star._id};
	game.pause();
	$.post("/victory", data, function(){
		game.renderGameResultPanel("Victory");
	});
}

Game.prototype.defeat = function(){
	var data = {level:user.level, exp:user.exp, gold:user.gold};
	game.pause();
	$.post("/defeat", data, function(){
		game.renderGameResultPanel("Defeat");
	});
}

Game.prototype.tick = function(){
    if(!createjs.Ticker.getPaused()){
        ship.tick();
        wave.tick();
    }
    stage.update();
}

Game.prototype.getStatistic = function(){
	return [
		{index:0, name:"Total damage dealt", value:this.total_damage_dealt},
		{index:1, name:"Largest damage dealt", value:this.largest_damage_dealt},
		{index:2, name:"Total damage taken", value:this.total_damage_taken},
		{index:3, name:"Largest damage dealt", value:this.largest_damage_taken},
		{index:4, name:"Number of enermies destroyed", value:this.enermy_destoryed},
		{index:5, name:"Total exp gained", value:this.total_exp_gained},
		{index:6, name:"Total gold earned", value:this.total_gold_earned},
	];
}