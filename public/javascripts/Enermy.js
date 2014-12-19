function Enermy(image_loader, type, path){
    console.log(Loader);
    var stage = Stage.getInstance();
    var ALIVE = true;
    var DESTROYED = false;
    var NORMAL = 1;

    var container;
    var health, health_bar, health_max;
    var x_min, x_max, y_min, y_max, width, height;
    var self = this;
    var exp, gold, rating;
    var ticks =0;
    init(image_loader);

    function init(image_loader){
        container = new createjs.Container();
        self.container = container;
        self.status = ALIVE;
        setShip(container, type, image_loader);
        stage.addChild(container);
        createjs.Tween.get(container).to({y:100},2000);
    }

    function setShip(container, type, image_loader){
        switch(type){
            case 1:
                health_max = health = 3;
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

                health_bar.graphics.beginFill("#CC0000").drawRect(x_min, y_min-10, width, width/10);

                container.addChild(left_wing,right_wing, body, health_bar);
                container.setBounds(x_min,y_min,width,height);
                container.x = Math.random()*stage.canvas.width;
                container.y = -100;
                exp = 1;
                gold = 1;
                rating = NORMAL;
            return false;
        }
    }

    function damaged(bullet){
        var damage = bullet.getDamage();
        health -= damage.amount;
        var font_size = damage.critical?"16":"12";
        var text = new createjs.Text(damage.amount, font_size+"px Arial", damage.critical?"#F6D605":"#F5F4FE");
        text.x = container.x;
        text.y = container.y;
        text.textBaseline = "alphabetic";
        stage.addChild(text);
        createjs.Tween.get(text)
        .to({x:text.x-10, y:text.y-20, alpha:0}, 1000).call(function(item){
            stage.removeChild(item.target);
        });
        health_bar.graphics.beginFill("#666666").drawRect(width/health_max*health+x_min, y_min-10, width*(health_max-health)/health_max, width/10);
        if(health <= 0){
            destroyed(bullet);
        }
    }

    function destroyed(bullet){
        /*
        var text = new createjs.Text("+"+gold, "bold 16px Arial", "#FFD34E");
        text.x = container.x;
        text.y = container.y;
        text.textBaseline = "alphabetic";
        stage.addChild(text);
        createjs.Tween.get(text)
        .to({x:text.x+10, y:text.y-20, alpha:0}, 1000).call(function(item){
            stage.removeChild(item.target);
        });
        */
        self.status = DESTROYED;
    }

    this.tick = function(){
        var angle = (Math.random()-.5)*2;
        container.rotation += angle;
        health_bar.rotation -= angle;
        container.y += 2*Math.cos(container.rotation*Math.PI/180);
        container.x -= 2*Math.sin(container.rotation*Math.PI/180);

        if(container.x < -width/2){
            container.x = stage.canvas.width + width/2;
        }
        if(container.x > stage.canvas.width + width/2){
            container.x = -width/2;
        }
        if(container.y > stage.canvas.height + height/2){
            container.y = -height/2;
        }
        ticks++;
    }

    this.getContainer = function(){
        return container;
    }

    this.isHit = function(bullets){
        var bullet_shapes = bullets.getBulletShape();
        bullet_shapes.forEach(function(bullet_shape){
            if(bullet_shape.x >= container.x - width/2 && bullet_shape.x <= container.x+width/2
                && bullet_shape.y >= container.y - height/2 && bullet_shape.y <= container.y+height/2){
                var bullet = bullet_shape.getbullet();
                damaged(bullet);
                bullet.hit(bullet_shape);
            }
        });
    }
}
