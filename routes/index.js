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
		res.render('home', { title:title, user:user });
	});
});

router.post('/game', function(req, res) {
	if(!req.body.star || !req.session.user || !req.session.ship){
		console.log("redirect");
		res.redirect("/");		
	}else{
		GameController.init(req, res, function(star){
			res.render('game', { title:title, star:star , ship:req.session.ship, user:req.session.user, difficulty:req.body.difficulty, bonus:req.body.bonus});
		});
	}
});

router.get('/galaxy', function(req, res){
	StarController.getGalaxy(req, function(process){
		res.contentType('json');
		res.send({ process:process });
	});
});

router.post('/getItems', function(req, res){
	ItemController.getItems(req.body.type, function(items){
		res.contentType('json');
		res.send({ items:items });
	});
});

router.post('/buyShip', function(req, res){
	ItemController.buyShip(req.body.ship_id, req.session.user._id, function(result){
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

router.get('*', function(req, res){
	res.redirect("/");
});

module.exports = router;