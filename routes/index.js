var express = require('express');
var router = express.Router();
var User = require('../controllers/User');


var user_session;
var title = "Galaga JS";

router.get('/', function(req, res) {
	User.authenticate(req, res);
	console.log('aa');
	/*
	var user;

	if(req.cookies.user_id){
		console.log("load game");
		User.getUser(req.cookies.user_id, function(user){
			user.greeting();
			res.render('home',{title:title});
		});
	}else{
		console.log("new game");
		user = User.insert();
		res.cookie('user_id', user._id, {maxAge: 10*365*24*60*60*1000, httpOnly: true });
		res.render('home',{title:title});
	}
	*/
});

router.get('/game', function(req, res) {
	console.log(req.cookies);
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

module.exports = router;
