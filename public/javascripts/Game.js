function Game(star, ship, user){
    var stars = [], enermies = [];
    var gold, exp, lvl;
    game = this;
    this.ship = ship;
    this.star = star;

    console.log(this.star);

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
	game_interface = new GameInterface();
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

Game.prototype.renderVictoryPanel = function(){
	this.victory_panel_container = new createjs.Container();
	var victory_panel = new createjs.Shape();
	var victory_start_button = new createjs.Bitmap(loader.getResult("button"));
	var victory_text = new createjs.Text("Victory","32px Arial","#fff");

	this.victory_panel_container.x = this.victory_panel_container.y = 320;
	victory_panel.graphics.s("#fff").ss(1).f("#333").rr(-200, -200, 400, 400, 10);
	victory_start_button.sourceRect = new createjs.Rectangle(638,1172,64,64);

	victory_start_button.regX = victory_start_button.regY = 32;
	victory_start_button.y = 140;
	victory_text.regX = victory_text.getMeasuredWidth()/2;
	victory_text.y = -180;
	victory_start_button.cursor = "pointer";


	this.victory_panel_container.addChild(victory_panel, victory_start_button, victory_text);

	this.getStatistic().forEach(function(item){
		var text = new createjs.Text(item.name+": "+item.value, "16px Arial","#fff");
		text.x = -160;
		text.y = -120 + 30 * item.index;
		this.victory_panel_container.addChild(text);
	}, this);

	stage.addChild(this.victory_panel_container);
	stage.update();
}

Game.prototype.victory = function(){
	var data = {level:user.level, exp:user.exp, gold:user.gold, star:this.star._id};
	console.log(data);
	$.post("/stageClear", data, function(res){
		console.log(res);
	});
	setTimeout(function(){ 
		game.pause();
		game.renderVictoryPanel();
	}, 3000);
}

Game.prototype.submit = function(){
    
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