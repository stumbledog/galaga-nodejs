var express = require('express');
var router = express.Router();

mongoose = require('mongoose');
UserModel = mongoose.model('User');
ShipModel = mongoose.model('Ship');
ShipItemModel = mongoose.model('ShipItem');
ShapeModel = mongoose.model('Shape');
FirearmModel = mongoose.model('Firearm');

UserController = require('../controllers/UserController');
ShipController = require('../controllers/ShipController');
StarController = require('../controllers/StarController');
GameController = require('../controllers/GameController');
ItemController = require('../controllers/ItemController');

var title = "Galaga JS";

router.get('/', function(req, res) {
	UserController.authenticate(req, res, function(user){
		StarController.getGalaxy(req, function(process){
			var data = {user:user, process:process, ship:req.session.ship};
			res.render('home', {data:data});
		});
	});
});

router.post('/game', function(req, res) {
	if(!req.body.star || !req.session.user || !req.session.ship){
		console.log("redirect");
		res.redirect("/");		
	}else{
		GameController.init(req, res, function(star){
			console.log(req.session.ship);
			var data = { title:title, star:star , ship:req.session.ship, user:req.session.user, difficulty:req.body.difficulty, bonus:req.body.bonus};
			res.render('game', {data:data});
		});
	}
});

router.post('/getItems', function(req, res){
	ItemController.getItems(req.body.type, function(items){
		res.contentType('json');
		res.send({ items:items });
	});
});

router.post('/buyShip', function(req, res){
	ItemController.buyShip(req, function(result){
		res.contentType('json');
		res.send(result);
	});
});

router.post('/victory', function(req, res){
	UserController.victory(req, res, function(process){
		res.contentType('json');
		res.send({ save:true });
	});
});

router.post('/defeat', function(req, res){
	UserController.defeat(req, res, function(){
		res.contentType('json');
		res.send({ save:true });
	});
});

router.get('/getUserShips', function(req,res){
	console.log("asd");
	ShipController.getUserShips(req, function(ships){
		res.contentType('json');
		res.send({ ships:ships });
	});
});

router.get('*', function(req, res){
	res.redirect("/");
});

module.exports = router;