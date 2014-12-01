function Enermy(stage, image_loader, type, path){
    var ALIVE = true;
    var DESTROYED = false;

    var container;
    var health, health_bar, health_max;
    var x_min, x_max, y_min, y_max, width, height;
    var self = this;
    init(image_loader);

    function init(image_loader){
        container = new createjs.Container();
        self.container = container;
        self.status = ALIVE;
        setShip(container, type, image_loader);
        setPath(container, path);
        stage.addChild(container);
        createjs.Tween.get(container).to({y:100},2000);
    }

    function setShip(container, type, image_loader){
        switch(type){
            case 1:
                health_max = health = 5;
                var body = new createjs.Shape();
                var left_wing = new createjs.Shape();
                var right_wing = new createjs.Shape();
                health_bar = new createjs.Shape();
                body.graphics.bf(image_loader.getResult("components")).dr(243,113,12,24);
                body.width = 12;
                body.height = 24;
                body.regX = 243 + body.width/2;
                body.regY = 113 + body.height/2;
                body.rotation = 180;
                left_wing.graphics.bf(image_loader.getResult("components")).dr(171,76,23,21);
                left_wing.x = 12;
                left_wing.y = -8;
                left_wing.width = 23;
                left_wing.height = 21;
                left_wing.regX = 171 + left_wing.width/2;
                left_wing.regY = 76 + left_wing.height/2;
                left_wing.rotation = 180;
                right_wing.graphics.bf(image_loader.getResult("components")).dr(208,76,23,21);
                right_wing.x = -12;
                right_wing.y = -8;
                right_wing.width = 23;
                right_wing.height = 21;
                right_wing.regX = 208 + right_wing.width/2;
                right_wing.regY = 76 + right_wing.height/2;
                right_wing.rotation = 180;

                x_min = y_min = -20;
                x_max = y_max = 20;
                width = 40;
                height = 40;

                health_bar.graphics.beginFill("#00CC00").drawRect(x_min, y_min-10, width, width/10);

                container.addChild(left_wing,right_wing, body, health_bar);
                container.setBounds(x_min,y_min,x_max-x_min,y_max-y_min);
            return false;
        }
    }

    function setPath(container, path){
        switch(path){
            case 1:
                container.x = Math.random()*stage.canvas.width;
                container.y = -100;
                createjs.Tween.get(container)
                    .to({y:Math.random()*stage.canvas.height/2+50}, 3000);
/*                .to({rotation:450}, 15000)
                .to({x:-200}, 6000)*/

          /*
            createjs.Tween.get(container)
                .to({y:50},2000)
                .to({x:250,y:200,rotation:-90},3000)
                .to({x:400,y:400,rotation:0},3000)
                .to({y:600},4000);
            break;
        */

            return false;
        }
    }

    function damaged(bullet){
        health -= bullet.getDamage();
        var text = new createjs.Text(bullet.getDamage(), "14px Arial", "#ffffff");
        text.x = container.x;
        text.y = container.y;
        text.textBaseline = "alphabetic";
        stage.addChild(text);
        createjs.Tween.get(text)
        .to({x:text.x-10, y:text.y-20, alpha:0}, 1000).call(function(item){
            stage.removeChild(item.target);
        });
        health_bar.graphics.beginFill("#CC0000").drawRect(width/health_max*health+x_min, y_min-10, width*(health_max-health)/health_max, width/10);
        if(health <= 0){
            destroyed();
        }
    }

    function destroyed(){
        self.status = DESTROYED;
    }

    this.getContainer = function(){
        return container;
    }

    this.isHit = function(bullets){
        var bullet_shapes = bullets.getBulletShape();
        bullet_shapes.forEach(function(bullet_shape){
            if(Math.pow(container.x-bullet_shape.x,2) + Math.pow(container.y-bullet_shape.y,2) < 400){
                var bullet = bullet_shape.getbullet();
                damaged(bullet);
                bullet.hit(bullet_shape);
            }
        });
    }
}
