function Game(star_input, ship_input){
    var stars = [], enermies = [];
    var gold, exp, lvl;
    var pause_text;

    init();

    function init(){
        stage = new createjs.Stage("game");
        var manifest = [
            {src:"./assets/images/Components64.png", id:"components"},
            {src:"./assets/images/Items64.png", id:"items"}
        ];

        loader = new createjs.LoadQueue(false);
        loader.addEventListener("complete", handleLoadComplete);
        loader.loadManifest(manifest);

        pause_text = new createjs.Text("PAUSED\nPress 'P' to resume", "bold 24px Arial", "#FFFFFF");
        pause_text.x = stage.canvas.width/2;
        pause_text.y = stage.canvas.height/2;
        pause_text.textAlign = "center";
        pause_text.textBaseline = "alphabetic";
    }

    function handleLoadComplete(){
        effect = new Effect();
        ship = new Ship(ship_input);
        wave = new Wave(star_input._wave);
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(30);
        initEventHandler();
    }

    function initEventHandler(){
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
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

    function handleKeyDown(event){
        switch(event.keyCode){
            case 73:
                return false;
            case 80:
                pause();
                return false;
            default:
                ship.keyDown(event.keyCode);
        }
    }

    function handleKeyUp(event){
        ship.keyUp(event.keyCode);
    }

    function pause(){
        if(createjs.Ticker.getPaused()){
            stage.removeChild(pause_text);
            createjs.Ticker.setPaused(false);
        }else{
            stage.addChild(pause_text);
            createjs.Ticker.setPaused(true);
        }
    }

    var ticks = 0;

    function tick(){
        if(!createjs.Ticker.getPaused()){
            if(ticks%30 == 0){
                var star = new createjs.Shape();
                var color = (parseInt(0xFF * Math.random())).toString(16);
                star.graphics.beginFill("#"+color+color+color).drawRect(Math.random() * stage.canvas.width, 0, 2, 2);
                stage.addChild(star);
                stars.push(star);
            }
            var visible_stars = [];
            stars.forEach(function(star){
                star.y += 1;
                if(star.y>stage.canvas.height){
                    stage.removeChild(star);
                    delete star;
                }else{
                    visible_stars.push(star);
                }
            });
            stars = visible_stars;
            ship.tick();
            wave.tick();
            ticks++;
        }
        stage.update();
    }
}
