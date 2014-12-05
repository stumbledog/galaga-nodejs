function Jarvis(){

	var container;
	var tick = 0;
	var animate = false;
	var lines;
	var angle_units = [];
	var arcs = [];
	var arc1, arc2, arc3, arc4;
	var line;
	var text1, text2, text3;
	var target;
	this.star;
	init();

	function init(){		
		container = new createjs.Container();

		target = new createjs.Shape();
		
		arc1 = new createjs.Shape();
		arc2 = new createjs.Shape();
		arc3 = new createjs.Shape();
		arc4 = new createjs.Shape();
		arc5 = new createjs.Shape();
		arc6 = new createjs.Shape();

		line = new createjs.Shape();
		
		text1 = new createjs.Text("", 'bold Italic 30pt Arial', '#00a9f6');
		text2 = new createjs.Text("", 'bold 16pt Arial', '#00AC65');
		text3 = new createjs.Text("", 'bold 16pt Arial', '#EBAF3C');

		container.addChild(target, arc1, arc2, arc3, arc4, arc5, arc6, line, text1, text2, text3);
	}

	this.addTo = function(stage){
		stage.addChild(container);
	}

	this.setTarget = function(star){
		console.log(star);
		this.star = star;
		animate = true;	
		tick = 0;
		target.graphics.clear()
			.f("#fff").rf(["#fff","#333"],[0,1],340,300,0,320,320,50)
			.dc(320, 320 , 50);
	}

	this.tick = function(event){
		if(animate){
			var angle1 = Math.PI * 4 / 3 + tick * Math.PI / 80;
			var angle2 = Math.PI;
			var angle3 = Math.PI * 4 / 3;
			var angle4;
			var angle5 = Math.PI * 3 / 4;
			var angle6 = tick * Math.PI / 30;
			var angle7 = Math.PI * 63 / 64;
			var angle8 = Math.PI * 58 / 64;
			var angle9 = Math.PI * 53 / 64;

			var length = tick % 5 === 0 ? 20 : 10;

			arc1.graphics.s("#00a9f6").ss(1)
				.mt(320+200*Math.cos(angle1), 320+200*Math.sin(angle1))
				.lt(320+(200-length)*Math.cos(angle1), 320+(200-length)*Math.sin(angle1));


			arc2.graphics.clear().s("#00a9f6").ss(1).arc(320, 320, 200, Math.PI * 4/3, angle1);


			arc3.graphics.clear().s("#c4d9de").ss(1)
				.arc(320, 320, 310, angle2, angle2+tick*(angle3-angle2)/60)
				.ss(1).arc(320, 320, 308, angle2, angle2+tick*(angle3-angle2)/60)
				.ss(1).arc(320, 320, 220, angle5, angle5+tick*Math.PI/240)
				.ss(1).arc(320, 320, 218, angle5, angle5+tick*Math.PI/240)
				.s("#00a9f6").ss(5).arc(320, 320, 150, 0, tick*Math.PI/80)
				.ss(1).arc(320, 320, 55, 0, tick*Math.PI/30)
				.ss(1).arc(320, 320, 65, 0, tick*Math.PI/30)
				.ss(1).arc(320, 320, 67, 0, tick*Math.PI/30)
				.ss(2).arc(320, 320, 70, 0, tick*Math.PI/30)
				//.s("#00AC65").ss(10).mt(320+70*Math.cos(angle7-0.15),320+70*Math.sin(angle7-0.15))
				//.lt(320+(70+tick*2.4)*Math.cos(angle7-0.15),320+(70+tick*2.4)*Math.sin(angle7-0.15))
				.s("#00AC65").ss(tick*2.3).arc(320, 320, 70+tick*1.15, angle7-0.2, angle7-0.1)
				.s("#EBAF3C").ss(tick*2.3).arc(320, 320, 70+tick*1.15, angle8-0.2, angle8-0.1)
				.s("#E9662C").ss(tick*2.3).arc(320, 320, 70+tick*1.15, angle9-0.2, angle9-0.1);

			arc6.graphics.s("#00a9f6").ss(10)
				.arc(320, 320, 60, angle6, angle6+0.06);


			line.graphics.clear()
				.s("#c4d9de").ss(1)
				.mt(320 + 70*Math.cos(angle2), 320 + 70*Math.sin(angle2))
				.lt(320 + (70+tick*4)*Math.cos(angle2), 320 + (70+tick*4)*Math.sin(angle2))
				.mt(320 + 70*Math.cos(angle3), 320 + 70*Math.sin(angle3))
				.lt(320 + (70+tick*4)*Math.cos(angle3), 320 + (70+tick*4)*Math.sin(angle3))
				.mt(320 + 70*Math.cos(angle5), 320 + 70*Math.sin(angle5))
				.lt(320 + (70+tick*2.5)*Math.cos(angle5), 320 + (70+tick*2.5)*Math.sin(angle5))

				text1.text = "Star Name";
				text2.text = "HP";
				text2.x = 320 + 200*Math.cos(angle7+0.01);
				text2.y = 320 + 200*Math.sin(angle7+0.01);
				text2.rotation = (angle7+0.01)*180/Math.PI - 180;

				text3.text = "EXP";
				text3.x = 320 + 200*Math.cos(angle8+0.01);
				text3.y = 320 + 200*Math.sin(angle8+0.01);
				text3.rotation = (angle8+0.01)*180/Math.PI - 180;

			if(tick >= 60){
				animate = false;
			}
			tick++;
		}
	}

}