function Menu(id){
	var image_loader, stage, jarvis, campaign_container, button_container;

	init();

	var campaigns = [
	{"index":0, "name":"Apus","x":320, "y":320, "r":7, "color":"#ffffff","next":[1,2]},
	{"index":1, "name":"Caelum", "x":380, "y":410, "r":11, "color":"#ffffff","next":[3,5]},
	{"index":2, "name":"Dorado", "x":420, "y":450, "r":8, "color":"#ffffff","next":[4]},
	{"index":3, "name":"Fornax", "x":370, "y":520, "r":10, "color":"#ffffff","next":[]},
	{"index":4, "name":"Hydus ", "x":470, "y":400, "r":9, "color":"#ffffff","next":[]},
	{"index":5, "name":"Lyra", "x":360, "y":470, "r":7, "color":"#ffffff","next":[]},
	];

	function init(){
		var manifest = [
		{src:"./assets/images/Button64.png", id:"button"},
		{src:"./assets/images/Ships64.png", id:"ship"},
		];
		stage = new createjs.Stage(id);
		stage.enableMouseOver(10);

		campaign_container = new createjs.Container();
		button_container = new createjs.Container();
		stage.addChild(campaign_container, button_container);

		jarvis = new Jarvis();
		jarvis.addTo(stage);

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

		campaigns.forEach(function(campaign_properties){
			var origin = {"x":campaign_properties.x, "y":campaign_properties.y};
			campaign_properties.next.forEach(function(index){
				var destination = {"x":campaigns[index].x,"y":campaigns[index].y};
				drawPath(origin, destination);
			});

			createCampaign(campaign_properties);
		});

		initEventHandler();

		createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(60);
	}

	function createButton(image_loader, type, x, y, size){
		var button = new Button(image_loader, type, size);
		button.setPosition(x, y);
		button.addTo(button_container);
	}

	function createCampaign(campaign_properties){
		var campaign = new Campaign(campaign_properties, image_loader);
		campaign.addEventListener("mousedown", function(event){
			campaign_container.visible = false;
			button_container.visible = false;
			jarvis.setTarget(this.parent);
		});
		campaign.addTo(campaign_container);
	}

	function drawPath(origin, destination){
		var shape = new createjs.Shape();
		shape.graphics.s("#544D47").ss(2).mt(origin.x, origin.y).lt(destination.x, destination.y);
		campaign_container.addChild(shape);
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
		jarvis.tick(event);
		stage.update(event);
	}
}
