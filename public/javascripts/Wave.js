var Wave = (function(){
	var instance;

	function init(waves){

		var waves = waves;
		var enemies = [], enemy_queue = [];

		var game = Game.getInstance();
		var stage = game.getStage();
		var ship = Ship.getInstance();
		var enemy_container = new createjs.Container();
		var bullet_container = new createjs.Container();
		var effect = Effect.getInstance();
		var user = User.getInstance();
		var slow = user.getSlowBullet();

		var current_wave = ticks = 0;
		var interval = 20 / game.getDifficulty()[0];
		var wave_count = waves.length;

		var wavetext, destoryed_enemy_count, wave_enemy_count;

		stage.addChild(enemy_container, bullet_container);

		renderStatus();
		queueEnemies();

		function renderStatus(){
			wavetext = new createjs.Text("Wave " + (current_wave + 1) + "   " + destoryed_enemy_count + " / " + wave_enemy_count, "16px Arial", "#fff");
			wavetext.y = 10;
			wavetext.x = 620;
			wavetext.textAlign = "right";
			stage.addChild(wavetext);
		}

		function queueEnemies(){
			destoryed_enemy_count = 0;
			wave_enemy_count = 0;
			Renderer.slideText("Wave " + (current_wave + 1), "fff", stage);
			waves[current_wave].enemies.forEach(function(enemy_property){
				wave_enemy_count += enemy_property.count * game.getDifficulty()[0];
				for(var i=0;i<enemy_property.count * game.getDifficulty()[0];i++){
					enemy_queue.push(enemy_property._enemy);
				}
			});

			update();
		}

		function update(){
			wavetext.text = "Wave " + (current_wave + 1) + "   " + destoryed_enemy_count + " / " + wave_enemy_count;
		}

		function spawnEnemy(){
			if(enemy_queue.length > 0){
				var enemy = new Enemy(enemy_queue.shift());
				enemy_container.addChild(enemy.getContainer());
			}
		}

		function nextWave(){
			current_wave++;
			if(current_wave === wave_count){
				game.victory();
			}else{
				queueEnemies();
			}
		}

		return {
			getEnemies:function(){
				return enemy_container.children;
			},
			enemyDestroyed:function(enemy){
				enemy_container.removeChild(enemy);
				destoryed_enemy_count++;
				update();
				if(wave_enemy_count == destoryed_enemy_count){
					nextWave();
				}
			},
			tick:function(){
				if(ticks > interval){
					spawnEnemy();
					ticks = 0;
				}

				enemy_container.children.forEach(function(enemy_shape){
					enemy_shape.enemy.tick();
				});

				bullet_container.children.forEach(function(bullet){
					if(bullet.x < -100 || bullet.x > 740 || bullet.y < -100 || bullet.y > 740){
						bullet_container.removeChild(bullet);
					}else{
						if(ship.isHit(bullet)){
							ship.damaged(bullet);
							effect.hit(bullet.x, bullet.y);
							bullet_container.removeChild(bullet);
						}else{
							bullet.x += bullet.speed * Math.cos(bullet.radian) * (100 - slow * 5)/100;
							bullet.y += bullet.speed * Math.sin(bullet.radian) * (100 - slow * 5)/100;
						}
					}
				});

				ticks++;
			},
			getCurrentWave:function(){
				return current_wave;
			},
			addBullet:function(bullet){
				bullet_container.addChild(bullet);
			},
			getCurrentBullets:function(){
				return bullet_container.children;
			}
		}
	}

	return{
		getInstance:function(waves){
			if(!instance){
				instance = init(waves);
			}
			return instance;
		}
	}
})();