function Ship(stage, image_loader, width, height){
    var VERTICAL_SPEED = HORIZONTAL_SPEED = 4;
    var shape, firearm;
    var move_right = move_left = move_up = move_down = trigger = false;
    var counter = 0;
    var exp = 0;
    var last_mouse_position = {x:0, y:0};

    init(image_loader, width, height);

    function init(image_loader, width, height){
        firearm = new Firearm(stage, image_loader, 10, 1, 10, 5, 1);
        shape = new createjs.Shape();
        shape.graphics.bf(image_loader.getResult("components")).drawRect(58,113,14,28);
        shape.regX = 65;
        shape.regY = 127;
        shape.x = width/2;
        shape.y = height + 100;
        shape.width = 14;
        shape.height = 28;
        stage.addChild(shape);
        createjs.Tween.get(shape).to({y:stage.canvas.height - 100},2000);
    }

    this.keyDown = function(key){
        switch(key) {
            case 87:
                move_up = true; return false;
            case 68:
                move_right = true; return false;
            case 83:
                move_down = true; return false;
            case 65:
                move_left = true; return false;
            case 32:
                trigger = true; return false;
        }
    }

    this.mouseDown = function(){
        trigger = true;
    }

    this.mouseUp = function(){
        trigger = false;
    }

    this.keyUp = function(key){
        switch(key) {
            case 87:
                move_up = false; return false;
            case 83:
                move_down = false; return false;
            case 68:
                move_right = false; return false;
            case 65:
                move_left = false; return false;
            case 32:
                trigger = false; return false;
        }
    }

    this.mouseMove = function(event){
        last_mouse_position.x = event.stageX;
        last_mouse_position.y = event.stageY;
    }

    this.getBullets = function(){
        return firearm.getBullets();
    }

    this.tick = function(stage) {
        counter++;

        var dx = last_mouse_position.x - shape.x;
        var dy = last_mouse_position.y - shape.y;
        var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;

        shape.rotation = degree;

        if(move_up && shape.y > 100){
            shape.y -= VERTICAL_SPEED;
        }else if(move_down && shape.y < stage.canvas.height - shape.height){
            shape.y += VERTICAL_SPEED;
        }

        if(move_right && shape.x < stage.canvas.width - shape.width){
            shape.x += VERTICAL_SPEED;
        }else if(move_left && shape.x >= shape.width){
            shape.x -= VERTICAL_SPEED;
        }

        if(trigger && counter >= firearm.getFireRate()){
            firearm.fire(shape.x, shape.y, degree);
            counter = 0;
        }

        firearm.tick(stage);
    }
};
