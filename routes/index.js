var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');
var ShipController = require('../controllers/ShipController');
var StarController = require('../controllers/StarController');
var GameController = require('../controllers/GameController');

var title = "Galaga JS";

router.get('/', function(req, res) {
	UserController.authenticate(req, res, function(user){
		res.render('home', { title:title, user:user });
	});
});

router.post('/game', function(req, res) {
	console.log(req.body);
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

router.post('/stageClear', function(req, res){
	UserController.stageClear(req, res, function(process){
		res.contentType('json');
		res.send({ process:process });
	});
});

router.get('*', function(req, res){
  res.redirect("/");
});

module.exports = router;