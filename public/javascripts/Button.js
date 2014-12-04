function Button(image_loader, type, size){
	var button, tooltip;
	var button_size = size;
	var self = this;

	init(image_loader, type);

	function init(image_loader, type){
		Crop = {
			"home":{x:638,y:258},
			"info":{x:638,y:331},
			"profile":{x:638,y:403},
			"inventory":{x:278,y:1245},
			"mastery":{x:638,y:1551},
			"rank":{x:278,y:630},
			"setting":{x:638,y:1014},
		}

		var crop = Crop[type];

		button = new createjs.Bitmap(image_loader.getResult("button"));
		button.sourceRect = new createjs.Rectangle(crop.x,crop.y,button_size,button_size);
		button.regX = button_size/2;
		button.regY = button_size/2;
		button.scale = 1;
		button.name = type;
		button.cursor = "pointer";
		button.button = self;

		tooltip = new createjs.Text(type.capitalize(), "bold 20px Arial", "#ffffff");
		tooltip.textAlign = "center";
		tooltip.scaleY = 0;

		initEventListener();
	}

	function initEventListener(){
		button.addEventListener("rollover", function(event){
			this.scaleX = this.scaleY = this.scale*1.2;
			createjs.Tween.get(tooltip).to({"scaleY":1}, 200);
			createjs.Tween.get(button).to({"scaleX":1.2,"scaleY":1.2}, 200);
		});
		button.addEventListener("rollout", function(event){
			this.scaleX = this.scaleY = this.scale;
			createjs.Tween.get(tooltip).to({"scaleY":0}, 200);
			createjs.Tween.get(button).to({"scaleX":1,"scaleY":1}, 200);
		});
	}

	this.addTo = function(stage){
		stage.addChild(tooltip);
		stage.addChild(button);
	}

	this.setPosition = function(x, y){
		tooltip.x = button.x = x;
		button.y = y;
		tooltip.y = button.y + 40;
	}
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}