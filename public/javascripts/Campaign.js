function Campaign(position, angle){
	var LENGTH = 100;
	var angle = angle | 0;
	var container, triangle, waves = [], texts = [];

	init(position);

	function init(position){
		container = new createjs.Container();
		container.x = position.x;
		container.y = position.y;

		triangle = new createjs.Shape();
		triangle.graphics.beginStroke("#333333").beginFill("#ffffff")
		.moveTo(LENGTH*Math.sin(angle), LENGTH*Math.cos(angle));
		
		[2/3,4/3,2].forEach(function(i){
			triangle.graphics.lineTo(LENGTH*Math.sin(angle + Math.PI*i), LENGTH*Math.cos(angle + Math.PI*i));
		});

		triangle.cursor = "pointer";

		container.addChild(triangle);


		waves.push(new Wave());
		waves.push(new Wave());
		waves.push(new Wave());
		waves.push(new Wave());
		waves.push(new Wave());

		[waves.length + " waves", "0 exp", "0 gold"].forEach(function(str){
			var text = new createjs.Text(str, "bold 20px Arial", "#ffffff");
			text.visible = false;
			text.textAlign = "center";
			container.addChild(text);
		});

		initEventListener();
	}

	function initEventListener(){
		triangle.on("rollover", function(event){
			triangle.graphics._fillInstructions[0].params[1] = '#cccccc';
			container.getChildAt(1).visible = true;
			container.getChildAt(2).visible = true;
			container.getChildAt(3).visible = true;
			createjs.Tween.get(container.getChildAt(1)).to({"x":100*Math.sin(0), "y":-100*Math.cos(0)}, 500);
			createjs.Tween.get(container.getChildAt(2)).to({"x":100*Math.sin(Math.PI*2/3), "y":-100*Math.cos(Math.PI*2/3)}, 500);
			createjs.Tween.get(container.getChildAt(3)).to({"x":100*Math.sin(Math.PI*4/3), "y":-100*Math.cos(Math.PI*2/3)}, 500);
		});

		triangle.on("rollout", function(event){
			createjs.Tween.get(container.getChildAt(1)).to({"x":0, "y":0}, 500).call(function(event){event.target.visible = false;});
			createjs.Tween.get(container.getChildAt(2)).to({"x":0, "y":0}, 500).call(function(event){event.target.visible = false;});
			createjs.Tween.get(container.getChildAt(3)).to({"x":0, "y":0}, 500).call(function(event){event.target.visible = false;});
		});

		/*
		triangle.on("rollover", function(event){
			createjs.Tween.get(this).to({"scaleY":this.scaleX/4}, 500);
		});

		triangle.on("rollout", function(event){
			createjs.Tween.get(this).to({"scaleY":this.scaleX}, 500);
		});*/
	}

	this.setPosition = function(x, y){
		triangle.x = x;
		triangle.y = y;
	}

	this.addTo = function(stage){
		stage.addChild(container);
	}
}