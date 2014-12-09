var express = require('express');
var router = express.Router();
var User = require('../controllers/User');


var user_session;

/* GET home page. */
router.get('/', function(req, res) {
  //user_session = req.session;
  user_session = {name:"edward", email:"stumbledog@gmail.com"};
	res.render('home', { title: 'Express Shooting Game', session:user_session});
});

router.get('/game', function(req, res) {
	res.render('game', { title: 'Express Shooting Game'});
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
