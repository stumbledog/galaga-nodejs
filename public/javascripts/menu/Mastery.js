function Mastery(){
	var container;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var mastery_point;


	init();

	function init(){
		container = new createjs.Container();
		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").dr(10,10,620,504);

		var save_button = createButton("Save", "#B64926", 430, 490);
		var reset_button = createButton("Reset", "#B64926", 500, 490);
		var revert_button = createButton("Revert", "#B64926", 580, 490);

		container.addChild(background, save_button, reset_button, revert_button);
	}

	function renderMasteryPoint(){
		var total_point = user.getInstance.getLevel();
		
		var user_point = 
		var available_point = new createjs.Text()
	}

	function createButton(text, color, x, y, event){
		var container = new createjs.Container();
		container.x = x;
		container.y = y;
		container.cursor = "pointer";
		var outline = new createjs.Text(text,"bold 20px Arial","#fff");
		outline.textAlign = "center";
		outline.textBaseline = "middle";
		outline.outline = 5;
		var text = outline.clone();
		text.outline = false;
		text.color = color;

		container.addEventListener("rollover", function(event){
			container.scaleX = container.scaleY = 1.2;
		});
		container.addEventListener("rollout", function(event){
			container.scaleX = container.scaleY = 1.0;
		});

		container.addChild(outline,text);
		return container;
	}

	function tick(){
	    stage.update();
	}

	var public = {
		open:function(){
			stage.addChild(container);
			/*
			$.get("/getMasteryPoint",function(res){
				console.log(res);
				renderMasteryPoint();
			});*/
		},
		close:function(){
			stage.removeChild(container);
		},
		isOpen:function(){
			return stage.getChildIndex(container) > 0;
		}
	}
	return public;
}