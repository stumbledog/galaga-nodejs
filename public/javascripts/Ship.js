var Ship = (function(){

	var instance;

	function init(ship){
		var shape, firearm, container, health_bar, damage_bar, level_up_text;
		var move_right = move_left = move_up = move_down = false;
		var last_mouse_position = {x:0, y:0};
		var ship = ship;
		
		var health_max = health = ship.health;
		var psychic_max = psychic = ship.psychic;

		var game = Game.getInstance();
		var stage = game.getStage();
		var loader = game.getLoader();
		var effect = Effect.getInstance();
		var ship_stats = ShipStats.getInstance(health, health_max);

		renderShip();
		renderHealthBar();
		renderText();
		initFirearm(ship.firearm);

		function renderShip(){
			container = new createjs.Container();
			ship.shape.components.forEach(function(component){
				var shape = new createjs.Shape();
				shape.graphics.bf(loader.getResult(ship.shape.file)).drawRect(component.crop_x,component.crop_y,component.width,component.height);
				shape.regX = component.crop_x + component.width / 2;
				shape.regY = component.crop_y + component.height / 2;
				shape.x = component.x;
				shape.y = component.y;
				container.addChild(shape);
			});
			container.x = container.y = 320;
			container.width = ship.width;
			container.height = ship.height;
			stage.addChild(container);
		}

		function renderHealthBar(){
			health_bar = new createjs.Shape();
			damage_bar = new createjs.Shape();
			health_bar.graphics.beginFill("#00CC00").drawRect(-ship.shape.radius, -ship.shape.radius, ship.shape.radius * 2, ship.shape.radius/5);
			damage_bar.graphics.beginFill("#CC0000").drawRect(ship.shape.radius * 2 / health_max * health - ship.shape.radius, -ship.shape.radius, ship.shape.radius * 2 * (health_max - health) / health_max, ship.shape.radius / 5);
			container.addChild(health_bar, damage_bar);
		}

		function renderText(){
			level_up_text = new createjs.Text("Level Up", "12px Arial", "#fff");
			level_up_text.regY = ship.shape.radius * 2;
			level_up_text.regX = level_up_text.getMeasuredWidth()/2;
			level_up_text.visible = false;
			container.addChild(level_up_text);
		}

		function initFirearm(data){
			firearm = new Firearm(data);
		}

		return{
			getContainer:function(){
				return container;
			},
			getHealth:function(){
				return health;
			},
			getHealthMax:function(){
				return health_max;
			},
			keyDown:function(key){
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
			},
			keyUp:function(key){
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
			},
			mouseDown:function(){

			},
			mouseUp:function(){

			},
			mouseMove:function(event){
		        last_mouse_position.x = event.stageX;
		        last_mouse_position.y = event.stageY;
		    },
		    tick:function() {
		        var dx = last_mouse_position.x - container.x;
		        var dy = last_mouse_position.y - container.y;
		        var degree = -Math.atan2(dx,dy) * 180 / Math.PI + 180;

		        container.rotation = degree;
				health_bar.rotation = -degree;
				damage_bar.rotation = -degree;
				level_up_text.rotation = -degree;

		        if(move_up && container.y > 0){
		            container.y -= ship.speed;
		        }else if(move_down && container.y < 640){
		            container.y += ship.speed;
		        }

		        if(move_right && container.x < 640){
		            container.x += ship.speed;
		        }else if(move_left && container.x > 0){
		            container.x -= ship.speed;
		        }

		        firearm.fire(container.x, container.y, degree);
		        firearm.tick();
		    },
		    isHit:function(bullet){
				return (Math.pow(bullet.x - container.x, 2) + Math.pow(bullet.y - container.y, 2) < Math.pow(ship.shape.radius + bullet.radius, 2));
			},
			damaged:function(bullet){
				var damage = bullet.damage;
				health -= damage;
				var text = new createjs.Text(damage, "12px Arial", "#F60605");
				text.x = container.x;
				text.y = container.y;
				text.textBaseline = "alphabetic";
				stage.addChild(text);
				createjs.Tween.get(text)
				.to({x:text.x-10, y:text.y-20, alpha:0}, 1000).call(function(item){
					stage.removeChild(item.target);
				});
				
				damage_bar.graphics.c().beginFill("#CC0000").drawRect(ship.shape.radius * 2 / health_max * health - ship.shape.radius, -ship.shape.radius, ship.shape.radius * 2 * (health_max - health) / health_max, ship.shape.radius / 5);
				ship_stats.renderHealthBar(health, health_max);
				if(health <= 0){
					this.destroyed(bullet);
				}

				game.addDamageTaken(damage);
			},
			destroyed:function(){
				effect.destroy(container.x,container.y, 1);
				stage.removeChild(container);
				game.defeat();
			},
			levelUp:function(){
				level_up_text.visible = true;
				health = health_max;	
				psychic = psychic_max;
				createjs.Tween.get(level_up_text)
				.to({scaleX:-1}, 500).to({scaleX:1}, 500).wait(1000).call(function(){
					level_up_text.visible = false;
				},[],this);
				damage_bar.graphics.c().beginFill("#CC0000").drawRect(ship.shape.radius * 2 / health_max * health - ship.shape.radius, -ship.shape.radius, ship.shape.radius * 2 * (health_max - health) / health_max, ship.shape.radius / 5);
				ship_stats.renderHealthBar(health, health_max);
			}
		}
	}

	return {
		getInstance:function(ship){
			if(!instance){
				instance = init.call(this, ship);
			}

			return instance;
		}
	}
})();