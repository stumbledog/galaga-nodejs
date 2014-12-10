(function Home(){
	var image_loader, stage, jarvis, campaign_container, button_container;

	init();

	function init(){
		var manifest = [
		{src:"./assets/images/Button64.png", id:"button"},
		{src:"./assets/images/Ships64.png", id:"ship"},
		];
		stage = new createjs.Stage("home");
		stage.enableMouseOver(10);

		image_loader = new createjs.LoadQueue(false);
		image_loader.addEventListener("complete", handleLoadComplete);
		image_loader.loadManifest(manifest);
	}

	function handleLoadComplete(){
		var title = new createjs.Text("Galaga JS", "bold 20px Arial", "#ffffff");
		title.textAlign = "center";
		title.x = stage.canvas.width/2;
		stage.addChild(title);
		stage.update();
	}

	function loginForm(){
		stage.canvas.innerHTML = "<form method = ";
	}

})();