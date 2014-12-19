function Ship(stage, image_loader, width, height, ship_input){
	var container, shape, firearms = [];
	var move_right = move_left = move_up = move_down = trigger = false;
	var counter = 0;
	var exp = 0;
	var speed;
	var last_mouse_position = {x:0, y:0};

	init(image_loader, width, height, ship_input);

	function init(image_loader, width, height, ship_input){
		speed = ship_input.speed;
		container = new createjs.Container();
		ship_input._shape.components.forEach(function(component){
			var shape = new createjs.Shape();
			shape.graphics.bf(image_loader.getResult("components")).drawRect(component.x,component.y,component.width,component.height);
			shape.regX = component.x + component.width / 2;
			shape.regY = component.y + component.height / 2;
			container.addChild(shape);
		});
		container.x = container.y = 320;
		container.width = ship_input.width;
		container.height = ship_input.height;
		stage.addChild(container);
		initFirearm(ship_input._firearm);
	}

	function initFirearm(firearm_property_array){
		firearm_property_array.forEach(function(firearm_property){
			var firearm = new Firearm(stage, image_loader, firearm_property.firerate, firearm_property.speed, firearm_property.damage, firearm_property.critical_rate, firearm_property.critical_damage);
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

    this.tick = function(stage) {
        var dx = last_mouse_position.x - container.x;
        var dy = last_mouse_position.y - container.y;
        var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;

        container.rotation = degree;

        if(move_up && container.y > 0){
            container.y -= speed;
        }else if(move_down && container.y < 640){
            container.y += speed;
        }

        if(move_right && container.x < 640){
            container.x += speed;
        }else if(move_left && container.x > 0){
            container.x -= speed;
        }

        firearms.forEach(function(firearm){
            if(trigger){
                firearm.fire(container.x, container.y, degree);
            }
            firearm.tick(stage);
        });
    }
};
