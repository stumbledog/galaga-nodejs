function Game(id){
    var stage = new createjs.Stage(id);
    var ship, image_loader, stars = [], enermies = [], time = 0;

    init();

    function init(){
        var manifest = [
            {src:"./assets/images/Components64.png", id:"components"},
            {src:"./assets/images/Items64.png", id:"items"}
        ];

        image_loader = new createjs.LoadQueue(false);
        image_loader.addEventListener("complete", handleLoadComplete);
        image_loader.loadManifest(manifest);
    }

    function handleLoadComplete(){
        ship = new Ship(stage, image_loader, stage.canvas.width, stage.canvas.height);

        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(30);
        initEventHandler();
    }

    function initEventHandler(){
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
    }

    function handleKeyDown(event){
        switch(event.keyCode) {

        }
    }

    function handleKeyUp(event){
        switch(event.keyCode) {

        }
    }

    function tick(){
        if(time%30 == 0){
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

        if(enermies.length){
            var bullets = ship.getBullets();
            if(bullets.getBulletShape().length){
                enermies.forEach(function(enermy){
                    if(enermy.status){
                        enermy.isHit(bullets);
                        if(!enermy.status){
                            stage.removeChild(enermy.getContainer());
                        }

                    }
                });
            }
        }

        spawnEnermies();
        ship.tick(stage);
        stage.update();
        time++;
    }

    function spawnEnermies(){
        if(time%60 == 0){
            var enermy = new Enermy(stage, image_loader, 1, 1);
            enermies.push(enermy);
        }
        /*
        switch(time){
            case 0:
            case 30:
            case 60:
            case 90:
                var enermy = new Enermy(stage, image_loader, 1, 1);
                enermies.push(enermy);
            return false;
        }*/
    }
}
