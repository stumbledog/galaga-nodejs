var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ship = mongoose.model('Ship');
var Process = mongoose.model('Process');
var Star = mongoose.model('Star');

//var ShipController = require('../controllers/ShipController');
var StarController = require('../controllers/StarController');
/*
exports.load = function (req, res, next, id) {
    var options = {
        criteria: { _id : id }
    };
    User.load(options, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};

exports.create = function (req, res) {
    var user = new User(req.body);
    user.provider = 'local';
    user.save(function (err) {
        if (err) {
            return res.render('users/signup', {
                error: utils.errors(err.errors),
                user: user,
                title: 'Sign up'
            });
        }
        // manually login the user once successfully signed up
        req.logIn(user, function(err) {
            if (err) req.flash('info', 'Sorry! We are not able to log you in!');
            return res.redirect('/');
        });
    });
};

exports.insert = function (req, res){
    var user = new User();
    user.save(function(err){
        if(err){
            return res.render('users',{
                //error:utils.errors(err.errors),
                user:user,
                title: 'Sign up'
            });
        }
    });
    return user;
};

exports.getList = function (req, res){
    User.find({}, function(err, users){
        users.forEach(function(user){
            console.log(user);
        });
    });
};

exports.getUser = function(id, callback){
    User.findById(id, function(err, user){
        callback(user);
    });
};

exports.sendAuthenticationEmail = function(req, res){

};
*/

exports.defeat = function(req, res, callback){
    console.log(req.body);
    User.findById(req.session.user._id, function(err, user){
        user.level = req.body.level;
        user.exp = req.body.exp;
        user.gold = req.body.gold;        
        user.save(function(){
            req.session.user = user;
            callback();
        });
    });
}

exports.victory = function(req, res, callback){
    User.findById(req.session.user._id, function(err, user){
        user.level = req.body.level;
        user.exp = req.body.exp;
        user.gold = req.body.gold;        
        console.log(user);
        user.save(function(){
            console.log(user);
            req.session.user = user;
            Process.findOne({_user:user._id}, function(err, process){
                Star.findById(req.body.star, function(err, star){
                    star._next.forEach(function(next){
                        if(process._selectable.indexOf(next) === -1){
                            process._selectable.push(next);
                        }
                        if(process._cleared.indexOf(req.body.star) === -1){
                            process._cleared.push(req.body.star);
                        }
                        process.save(function(){
                            callback(process);
                        });
                    });
                });
            });
        });
    });
}

exports.authenticate = function(req, res, callback){
	if(req.cookies.user_id){
		var self = this;
		User.findById(req.cookies.user_id, function(err, user){
			if(user){
				req.session.user = user;
                console.log(user._selected_ship);
				ShipController.select(user._selected_ship, function(ship){
					req.session.ship = ship;
                    console.log(ship);
					//self.populateSelectedShip(user, function(user){
                        callback(user);
                    //});
				});
			}else{
				self.createUser(req, res, callback);
			}
		});
	}else{
		this.createUser(req, res, callback);
	}
}

exports.createUser = function(req, res, callback){
    var self = this;
	var user = new User();
    user.gold = 10000;
	user.save(function(){
		var process = new Process({_user:user._id, _selectable:[1]});
		process.save(function(){
			ShipController.create(user, function(ship){
                req.session.user = user;
                req.session.ship = ship;
                console.log(user);
                console.log(ship);
                res.cookie('user_id', user._id, {maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true });
                callback(user);
/*

				user._selected_ship = ship._id;
				user.save(function(){
                    self.populateSelectedShip(user, function(user){
                        req.session.user = user;
                        req.session.ship = ship;
                        res.cookie('user_id', user._id, {maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true });
                        callback(user);
                    });
				});*/
			});
		});
	});
}

exports.populateSelectedShip = function(user, callback){
    callback(user);
    /*
    ShipModel.populate(user, {path:"_selected_ship"}, function(err, user){
        ShapeModel.populate(user, {path:"_selected_ship._shape"}, function(err, user){
            callback(user);
        });
    });*/    
}