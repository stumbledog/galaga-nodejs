var Effect = (function(){

	var instance;

	function init(){
		var game = Game.getInstance();
		var stage = game.getStage();
		var loader = game.getLoader();

		var sprite_sheet = new createjs.SpriteSheet({
			images:[loader.getResult("items")],
			frames:[
				[24,126,17,16,0,8.5,8],
				[49,120,29,29,0,14.5,14.5],
				[84,117,36,36,0,18,18],
				[129,115,39,39,0,19.5,19.5],
				[175,109,51,51,0,25.5,25.5],
				[234,102,65,65,0,32.5,32.5],
			],
			animations:{
				"hit":{
					frames:[0,1,2,3,4,5],
					next:false
				}
			}
		});

		return{
			hit:function(x,y){
				var animation = new createjs.Sprite(sprite_sheet, "hit");
				animation.play();
				animation.x = x;
				animation.y = y;
				animation.scaleX = animation.scaleY = 0.5;
				stage.addChild(animation);
				animation.on("animationend", function(event){
					stage.removeChild(this);
				});
			},
			destroy:function(x,y,scale){
				var animation = new createjs.Sprite(sprite_sheet, "hit");
				animation.play();
				animation.x = x;
				animation.y = y;
				animation.scaleX = animation.scaleY = scale;
				stage.addChild(animation);
				animation.on("animationend", function(event){
					stage.removeChild(this);
				});	
			}
		}
	}

	return{
		getInstance:function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	}
})();