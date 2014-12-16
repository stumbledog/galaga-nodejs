var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
var ShipController = require('../controllers/ShipController');
var StarController = require('../controllers/StarController');

var title = "Galaga JS";

router.get('/', function(req, res) {
	UserController.authenticate(req, res, function(user){
		console.log("callback");
		res.render('home',{title:title, user:user});
	});
});

router.get('/game', function(req, res) {
	console.log(req.session);
	res.cookie('name', 'edward');
	res.render('home', { title: title});
});

router.get('/hangar', function(req, res) {
	res.render('hangar', { title: 'Express Shooting Game'});
});

router.get('/users', function(req, res) {
	User.getList(req, res);
});

router.get('/user/create', function(req, res) {
	User.insert({"name":"edward"});
});

router.get('/galaxy', function(req, res){
	StarController.getGalaxy(req, function(processes){
		res.contentType('json');
		res.send({ processes:processes });
	});
});

module.exports = router;