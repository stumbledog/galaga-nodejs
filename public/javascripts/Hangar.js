function Hangar(id){
	var image_loader, stage;

	init();

	function init(){
		var manifest = [
		{src:"./assets/images/Button64.png", id:"button"}
		];
		stage = new createjs.Stage(id);
		stage.enableMouseOver(10);
		image_loader = new createjs.LoadQueue(false);
		image_loader.addEventListener("complete", handleLoadComplete);
		image_loader.loadManifest(manifest);
	}

	function handleLoadComplete(){
		var width = stage.canvas.width;
		var height = stage.canvas.height;
		var buttons = ["info","profile","inventory","mastery","rank","setting"];
		var button_count = buttons.length;
		
		for(var i=0; i< button_count; i++){
			createButton(image_loader, buttons[i], width/(button_count+1)*(i+1), height - 64, 64);
		}

		createCampaign({"x":width/2,"y":height/2}, 0);

		initEventHandler();

		createjs.Ticker.addEventListener("tick", tick);
	}

	function createButton(image_loader, type, x, y, size){
		var button = new Button(image_loader, type, size);
		button.setPosition(x, y);		
		button.addTo(stage);
	}

	function createCampaign(center, angle){
		var campaign = new Campaign({"x":center.x, "y":center.y});
		//campaign.setPosition(center.x, center.y);
		campaign.addTo(stage);
		/*
		var length = 100;
		var campaign = new createjs.Shape();
		campaign.graphics.beginStroke("#333333").beginFill("#ffffff")
		.moveTo(length*Math.sin(angle), length*Math.cos(angle));
		
		[2/3,4/3,2].forEach(function(i){
			campaign.graphics.lineTo(length*Math.sin(angle + Math.PI*i), length*Math.cos(angle + Math.PI*i));
		});

		campaign.x = center.x;
		campaign.y = center.y;
		campaign.cursor = "pointer";

		stage.addChild(campaign);

		campaign.on("mousedown", function(event){
			animate = true;
			createjs.Tween.get(this).to({"scaleY":this.scaleX/4}, 500);
		});
		campaign.on("rollout", function(event){
			animate = true;
			createjs.Tween.get(this).to({"scaleY":this.scaleX}, 500);
		});*/
	}

	function initEventHandler(){
		document.onkeydown = handleKeyDown;
	}

	function handleKeyDown(event){
		switch(event.keyCode){
			case 73:

			break;
			case 80:

			break;
			default:
		}
	}

	function tick(event) {
		stage.update(event);
	}
}
