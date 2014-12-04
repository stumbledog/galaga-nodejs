function Campaign(properties, image_loader){
	var container, waves = [];
	var circle, name;
	var radius = properties.r;
	var self = this;
	init(properties, image_loader);

	function init(properties, image_loader){
		container = new createjs.Container();
		container.x = properties.x;
		container.y = properties.y;
		container.radius = radius;

		circle = new createjs.Shape();
		circle.graphics
			.rf(["#fff","#333"],[0,1],radius/3,-radius/3,0,0,0,radius)
			.dc(0, 0 , radius);
		circle.cursor = "pointer";

		name = new createjs.Text(properties.name, "14px Arial", "#ffffff");
		name.x = radius+5;
		name.outline = 0;

		container.addChild(circle,name);

		waves.push(new Wave());
		waves.push(new Wave());
		waves.push(new Wave());
		waves.push(new Wave());
		waves.push(new Wave());

		initEventListener();
	}

	function initEventListener(){
		circle.on("rollover", function(event){
			circle.graphics.clear()
			.f("#fff").dc(0,0,radius+2)
			.rf(["#fff","#333"],[0,1],radius/3,-radius/3,0,0,0,radius)
			.dc(0, 0 , radius);
			name.outline = 1;
		});

		circle.on("rollout", function(event){
			circle.graphics.clear()
			.rf(["#fff","#333"],[0,1],radius/3,-radius/3,0,0,0,radius)
			.dc(0, 0 , radius);
			name.outline = 0;
		});

		circle.on("mousedown", function(event){

		});
	}

	this.addEventListener = function(type, callback){
		circle.on(type,callback);
	}

	this.addTo = function(stage){
		stage.addChild(container);
	}
}