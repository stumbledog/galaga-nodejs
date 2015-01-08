exports.authenticate = function(req, res, callback){
	if(req.session.user){
		this.getUser(req.session.user, function(user){
			ShipController.select(user._selected_ship, function(ship){
				callback(user, ship);
			});
		});
	}else{
		if(req.cookies.user_id){
			var self = this;
			UserModel.findById(req.cookies.user_id, function(err, user){
				if(user){
					req.session.user = user._id;
					ShipController.select(user._selected_ship, function(ship){
						callback(user, ship);
					});
				}else{
					self.createUser(req, res, callback);
				}
			});
		}else{
			this.createUser(req, res, callback);
		}
	}
}

exports.createUser = function(req, res, callback){
	var self = this;
	var user = new UserModel();
	user.gold = 10000;
	user.save(function(){
		var process = new ProcessModel({_user:user._id, _selectable:[1]});
		process.save(function(){
			ShipController.create(user, function(ship){
				req.session.user = user._id;
				res.cookie('user_id', user._id, {maxAge: 10 * 365 * 24 * 60 * 60 * 1000, httpOnly: true });
				callback(user, ship);
			});
		});
	});
}

exports.getUser = function(user_id, callback){
	UserModel.findById(user_id, function(err, user){
		callback(user);
	});
}

exports.defeat = function(req, res, callback){
	console.log(req.body);
	UserModel.findById(req.session.user, function(err, user){
		user.level = req.body.level;
		user.exp = req.body.exp;
		user.gold = req.body.gold;
		user.save(function(){
			callback();
		});
	});
}

exports.victory = function(req, res, callback){
	console.log(req.session.user);
	UserModel.findById(req.session.user, function(err, user){
		user.level = req.body.level;
		user.exp = req.body.exp;
		user.gold = req.body.gold;
		user.save(function(){
			ProcessModel.findOne({_user:user._id}, function(err, process){
				StarModel.findById(req.body.star, function(err, star){
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
