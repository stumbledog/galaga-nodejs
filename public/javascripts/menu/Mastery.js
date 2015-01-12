function Mastery(){
	var main_container;
	var mastery_container;
	var user = User.getInstance();
	var stage = Home.getInstance().getStage();
	var loader = Home.getInstance().getLoader();
	var total_point, available_point, used_point;
	var mastery;
	init();

	function init(){
		main_container = new createjs.Container();
		mastery_container = new createjs.Container();
		var background = new createjs.Shape();
		background.graphics.s("#fff").ss(5).f("#333").dr(10,10,620,504);


		var close_button = new createjs.Shape();
		close_button.graphics.bf(loader.getResult("button")).drawRect(638,1094,63,66);
		close_button.regX = 670;
		close_button.regY = 1127;
		close_button.x = 605;
		close_button.y = 35;
		close_button.scaleX = close_button.scaleY = 0.5;
		close_button.cursor = "pointer";
		close_button.addEventListener("mousedown", function(event){
			public.close();
		});

		main_container.addChild(background, mastery_container, close_button);

		createButton("Save", "#B64926", 430, 490, function(event){
			var save = [];
			for(key in mastery){
				save[key] = mastery[key].point;
			}
			console.log(save);
			$.post("/saveMastery",{mastery:JSON.stringify(mastery)}, function(res){
				console.log(res);
				Renderer.slideText("Your mastery is saved!", "#A7A37E", stage);
			});
		});
		createButton("Reset", "#B64926", 500, 490, function(event){
			for(id in mastery){
				mastery[id].point = 0;
			}
			initMastery();
		});
		createButton("Revert", "#B64926", 580, 490, function(event){
			$.get("/getMasteryPoint",function(res){
				total_point = res.total_point;
				mastery = res.mastery;
				initMastery(mastery);
			});
		});
	}

	function initMastery(){
		mastery_container.removeAllChildren();
		var index = 0;
		used_point = 0;

		for(id in mastery){
			createMastery(id, index);
			used_point += mastery[id].cost * (Math.pow(mastery[id].point, 2) + mastery[id].point) / 2;
			index++;
		}
		available_point = total_point - used_point;

		var available_point_outline = new createjs.Text("Available Point: "+available_point, "bold 20px Arial","#000");
		available_point_outline.x = 20;
		available_point_outline.y = 490;
		available_point_outline.textBaseline = "middle";
		available_point_outline.outline = 5;
		var available_point_text = available_point_outline.clone();
		available_point_text.outline = false;
		available_point_text.color = "#468966";
		mastery_container.addChild(available_point_outline, available_point_text);
	}

	function createMastery(id, index){
		var name = mastery[id].name;
		var description = mastery[id].description;
		var unit_cost = mastery[id].cost;
		var point = mastery[id].point;

		var cost = unit_cost * (1 + point);
		var x = index % 3 * 203 + 20;
		var y = parseInt(index / 3) * 60 + 60;
		
		var container = new createjs.Container();
		container.x = x;
		container.y = y;
		
		var border = new createjs.Shape();
		border.graphics.s("#000").ss(3).f("#ccc").dr(0,0,193,50);
		
		var name_text_outline = new createjs.Text(name, "bold 12px Arial", "#000");
		name_text_outline.x = 4;
		name_text_outline.y = 4;
		name_text_outline.outline = 4;
		var name_text = name_text_outline.clone();
		name_text.outline = false;
		name_text.color = "#B64926";

		var cost_text = new createjs.Text("Cost:", "11px Arial", "#FFB03B");
		cost_text.x = name_text.getMeasuredWidth() + 20;
		cost_text.y = 5;
		var cost_text_outline = cost_text.clone();
		cost_text_outline.color = "#000";
		cost_text_outline.outline = 4;

		var cost_amount = new createjs.Text(mastery[id].max == point ? "Max" : cost, "11px Arial", "#FFB03B");
		cost_amount.x = name_text.getMeasuredWidth() + cost_text.getMeasuredWidth() + 24;
		cost_amount.y = 5;

		var cost_amount_outline = cost_amount.clone();
		cost_amount_outline.color = "#000";
		cost_amount_outline.outline = 4;
		
		var description_text = new createjs.Text(description, "12px Arial", "#000");
		description_text.x = 4;
		description_text.y = 20;

		var up = new createjs.Shape();
		up.graphics.bf(loader.getResult("button")).drawRect(638,780,63,66);
		up.regX = 670;
		up.regY = 813;
		up.x = 155;
		up.y = 35;
		up.scaleX = up.scaleY = 0.35;
		up.cursor = "pointer";

		var down = new createjs.Shape();
		down.graphics.bf(loader.getResult("button")).drawRect(638,860,63,66);
		down.regX = 670;
		down.regY = 893;
		down.x = 180;
		down.y = 35;
		down.scaleX = down.scaleY = 0.35;
		down.cursor = "pointer";

		var point_outline = new createjs.Text(point,"14px Arial","#000");
		point_outline.x = 172;
		point_outline.y = 5;
		point_outline.textAlign = "center";
		point_outline.outline = 4;

		var point_text = point_outline.clone();
		point_text.outline = false;
		point_text.color = "#fff";

		up.addEventListener("mousedown", function(event){
			if(available_point >= cost){
				if(mastery[id].max && mastery[id].max < mastery[id].point + 1){
					Renderer.slideText("Already reached mamximum point", "#BD4932", stage);
				}else{
					mastery[id].point++;
					initMastery();					
				}
			}else{
				Renderer.slideText("Not enought mastery point", "#BD4932", stage);
			}
		});

		down.addEventListener("mousedown", function(event){
			if(point > 0){
				mastery[id].point--;
				initMastery();
			}
		});

		container.addChild(border, name_text_outline, name_text, cost_text_outline, cost_text, cost_amount_outline, cost_amount, description_text, down, point_outline, point_text);

		if(!mastery[id].max){
			container.addChild(up);
		}else if(mastery[id].max > point){
			container.addChild(up);
		}
		mastery_container.addChild(container);
	}

	function createButton(text, color, x, y, event){
		var container = new createjs.Container();
		container.x = x;
		container.y = y;
		container.cursor = "pointer";
		var outline = new createjs.Text(text,"bold 20px Arial","#000");
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
		container.addEventListener("mousedown", event);
		container.addChild(outline,text);
		main_container.addChild(container);
	}

	function tick(){
	    stage.update();
	}

	var public = {
		open:function(){
			stage.addChild(main_container);
			$.get("/getMasteryPoint",function(res){
				total_point = res.total_point;
				mastery = res.mastery;
				initMastery(mastery);
			});
		},
		close:function(){
			stage.removeChild(main_container);
		},
		isOpen:function(){
			return stage.getChildIndex(main_container) > 0;
		}
	}
	return public;
}