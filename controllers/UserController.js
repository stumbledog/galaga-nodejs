exports.authenticate = function(req, res, callback){
	if(req.session.user){
		UserModel.findById(req.session.user, function(err, user){
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
	user.level = 50;
	user.gold = 100000;
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

exports.getMasteryPoint = function(req, res){
	UserModel.findById(req.session.user, function(err, user){
		res.contentType('json');
		res.send({ total_point:user.level, mastery:user.mastery });
	});
}

exports.saveMastery = function(req, res){
	UserModel.findById(req.session.user, function(err, user){
		user.mastery = JSON.parse(req.body.mastery);
		user.save(function(){
			res.contentType('json');
			res.send({ total_point:user.level, mastery:user.mastery });			
		});
	});
}

exports.defeat = function(req, res){
	console.log(req.body);
	UserModel.findById(req.session.user, function(err, user){
		user.level = req.body.level;
		user.exp = req.body.exp;
		user.gold = req.body.gold;
		user.save(function(){
			res.contentType('json');
			res.send({ save:true });
		});
	});
}

exports.victory = function(req, res){
	console.log(req.session.user);
	UserModel.findById(req.session.user, function(err, user){
		user.level = req.body.level;
		user.exp = req.body.exp;
		user.gold = req.body.gold;
		user.save(function(){
			ProcessModel.findOne({_user:user._id}, function(err, process){
				StarModel.findById(req.body.star, function(err, star){
					if(process._selectable.indexOf(star.next) === -1){
						process._selectable.push(star.next);
					}
					if(process._cleared.indexOf(req.body.star) === -1){
						process._cleared.push(req.body.star);
					}
					process.save(function(){
						res.contentType('json');
						res.send({ save:true });
					});
				});
			});
		});
	});
}
