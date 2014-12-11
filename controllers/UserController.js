var mongoose = require('mongoose');
var User = mongoose.model('User');

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

exports.authenticate = function(req, res, callback){
    var user;

    if(req.cookies.user_id){
        console.log("load game");
        User.findById(req.cookies.user_id, function(err, user){
            user.greeting();
            callback();
        });
    }else{
        console.log("new game");
        user = new User();
        user.save();
        res.cookie('user_id', user._id, {maxAge: 10*365*24*60*60*1000, httpOnly: true });
        callback();
    }
}