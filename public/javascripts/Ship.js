function Ship(ship_input){
	var shape, firearms = [];
	var move_right = move_left = move_up = move_down = trigger = false;
	var last_mouse_position = {x:0, y:0};
	this.ship = ship_input;

	init.call(this);

	function init(){
		this.health = this.ship.health;
		this.health_max = this.ship.health;
		this.ship.exp_cap = this.ship.level * 2;
		this.renderShip();
		this.renderHealthBar();
		initFirearm(this.ship._firearm);
	}

	function initFirearm(firearm_property_array){
		firearm_property_array.forEach(function(firearm_property){
			var firearm = new Firearm(firearm_property.firerate, firearm_property.speed, firearm_property.damage, firearm_property.critical_rate, firearm_property.critical_damage);
			firearms.push(firearm);
		});
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
        var bullets = [];
        firearms.forEach(function(firearm){
            bullets.push(firearm.getBullets());
        })
        return bullets;
    }

    this.tick = function() {
        var dx = last_mouse_position.x - this.container.x;
        var dy = last_mouse_position.y - this.container.y;
        var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;

        this.container.rotation = degree;
		this.health_bar.rotation = -degree;

        if(move_up && this.container.y > 0){
            this.container.y -= this.ship.speed;
        }else if(move_down && this.container.y < 640){
            this.container.y += this.ship.speed;
        }

        if(move_right && this.container.x < 640){
            this.container.x += this.ship.speed;
        }else if(move_left && this.container.x > 0){
            this.container.x -= this.ship.speed;
        }

        firearms.forEach(function(firearm){
            if(trigger){
                firearm.fire(this.container.x, this.container.y, degree);
            }
            firearm.tick();
        }, this);
    }
};

Ship.prototype.renderShip = function(){
	this.container = new createjs.Container();
	this.ship._shape.components.forEach(function(component){
		var shape = new createjs.Shape();
		shape.graphics.bf(loader.getResult("components")).drawRect(component.x,component.y,component.width,component.height);
		shape.regX = component.x + component.width / 2;
		shape.regY = component.y + component.height / 2;
		this.container.addChild(shape);
	}, this);
	this.container.x = this.container.y = 320;
	this.container.width = this.ship.width;
	this.container.height = this.ship.height;
	stage.addChild(this.container);
}

Ship.prototype.renderHealthBar = function(){
	this.health_bar = new createjs.Shape();
	this.health_bar.graphics.beginFill("#00CC00").drawRect( -this.ship._shape.radius, -this.ship._shape.radius * 2, this.ship._shape.radius * 2, this.ship._shape.radius/5);
	this.container.addChild(this.health_bar);
}

Ship.prototype.isHit = function(bullet){
	return (Math.pow(bullet.x - this.container.x, 2) + Math.pow(bullet.y - this.container.y, 2) < Math.pow(this.ship._shape.radius, 2));
}

Ship.prototype.damaged = function(bullet){
	var damage = bullet.damage;
	this.health -= damage;
	var text = new createjs.Text(damage, "12px Arial", "#F60605");
	text.x = this.container.x;
	text.y = this.container.y;
	text.textBaseline = "alphabetic";
	stage.addChild(text);
	createjs.Tween.get(text)
	.to({x:text.x-10, y:text.y-20, alpha:0}, 1000).call(function(item){
		stage.removeChild(item.target);
	});
	
	this.health_bar.graphics.beginFill("#CC0000").drawRect(this.ship._shape.radius * 2 / this.health_max * this.health - this.ship._shape.radius, -this.ship._shape.radius * 2, this.ship._shape.radius * 2 * (this.health_max - this.health) / this.health_max, this.ship._shape.radius / 5);	
	if(this.health <= 0){
		this.destroyed(bullet);
	}
}

Ship.prototype.destroyed = function(){
	effect.destroy(this.container.x,this.container.y, 1);
	stage.removeChild(this.container);	
}

Ship.prototype.getExp = function(exp){
	this.ship.exp += exp;
	if(this.ship.exp >= this.ship.level * 2){
		this.levelUp();
	}
	game_interface.renderExpBar();
}

Ship.prototype.getGold = function(gold){
	this.gold += gold;
}

Ship.prototype.levelUp = function(){
	this.ship.exp -= this.ship.level * 2;
	this.ship.level++;
	this.ship.exp_cap = this.ship.level * 2;
	var level_up_text = new createjs.Text("Level Up", "20px Arial", "#fff");

	level_up_text.x= level_up_text.y = 320;
	level_up_text.regX = level_up_text.getMeasuredWidth()/2;
	console.log(level_up_text);
	//level_up_text.regX = level_up_text.
	stage.addChild(level_up_text);
	createjs.Tween.get(level_up_text)
	.to({scaleX:-1}, 500).to({scaleX:1}, 500).wait(1000);
}