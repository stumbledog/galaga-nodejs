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
		/*
		var title = new createjs.Text("Galaga JS", "14px Arial", "#ffffff");
		title.textAlign = "center";
		title.x = stage.canvas.width/2;
		stage.addChild(title);
		stage.update();
		*/
		loadGalaxy();
	}

	function loadGalaxy(){
		$.get("/galaxy", function(res){
			console.log(res.processes);
			res.processes.forEach(function(process){
				var star = process._star;
				var container = new createjs.Container();
				container.x = star.x;
				container.y = star.y;
				var radius = star.radius;			

				var star_shape = new createjs.Shape();
				star_shape.graphics
				.rf(["#fff","#333"],[0,1],radius/3,-radius/3,0,0,0,radius)
				.dc(0, 0 , radius);
				star_shape.cursor = "pointer";

				var text = new createjs.Text(star.name, "14px Arial", "#ffffff");
				text.x = radius+5;

				if(process.clear){
					star._next.forEach(function(path){
						var line = new createjs.Shape();
						line.graphics.s('#fff').mt(star.x, star.y).lt(path.x, path.y);
						stage.addChild(line);
					});
				}else{
					var over = new createjs.Shape();
					over.graphics
					.f("#fff")
					.dc(0, 0 , radius+2);
					container.addChild(over);
				}

				container.addChild(star_shape, text);
				stage.addChild(container);
			});
			stage.update();
		});
	}

})();