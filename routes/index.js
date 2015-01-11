var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

EnermyModel = mongoose.model('Enermy');
ProcessModel = mongoose.model('Process');
ShipModel = mongoose.model('Ship');
StarModel = mongoose.model('Star');
ShapeModel = mongoose.model('Shape');
UserModel = mongoose.model('User');
WaveModel = mongoose.model('Wave');

UserController = require('../controllers/UserController');
ShipController = require('../controllers/ShipController');
StarController = require('../controllers/StarController');
GameController = require('../controllers/GameController');
ItemController = require('../controllers/ItemController');

var title = "Galaga JS";

router.get('/', function(req, res) {
	UserController.authenticate(req, res, function(user, ship){
		StarController.getGalaxy(req, function(process){
			var difficulty = req.session.difficulty? req.session.difficulty : "1,1,1,1,1";
			var data = { title:title, user:user, process:process, ship:ship, difficulty:difficulty};
			res.render('home', {data:data});
		});
	});
});

router.post('/game', function(req, res) {
	if(!req.body.star || !req.session.user){
		console.log("redirect");
		res.redirect("/");
	}else{
		GameController.init(req, res, function(user, ship, star){
			req.session.difficulty = req.body.difficulty;
			var data = { title:title, star:star , ship:ship, user:user, difficulty:req.session.difficulty, bonus:req.body.bonus};
			res.render('game', {data:data});
		});
	}
});

router.get('/getShips', function(req, res){
	ShipController.getShips(req.session.user, function(ships){
		res.contentType('json');
		res.send({ ships:ships });
	});
});

router.get('/getMasteryPoint',function(req, res){
	UserController.getMasteryPoint(req, res);
});

router.post('/saveMastery', function(req, res){
	UserController.saveMastery(req, res);
})

router.post('/buyShip', function(req, res){
	ItemController.buyShip(req, function(result){
		res.contentType('json');
		res.send(result);
	});
});

router.post('/upgrade', function(req, res){
	ShipController.upgrade(req, function(result){
		res.contentType('json');
		res.send(result);
	});
});

router.post('/selectShip', function(req, res){
	ShipController.selectShip(req, function(result){
		res.contentType('json');
		res.send(result);
	});
});

router.post('/victory', function(req, res){
	UserController.victory(req, res);
});

router.post('/defeat', function(req, res){
	UserController.defeat(req, res);
});

router.get('/getUserShips', function(req,res){
	ShipController.getUserShips(req, function(ships){
		res.contentType('json');
		res.send({ ships:ships });
	});
});

router.get('*', function(req, res){
	res.redirect("/");
});

module.exports = router;