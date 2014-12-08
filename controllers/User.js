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
    var user = new User({
        name: "edward",
        email: "stumbledog@gmail.com",
        password: "qwer1234"
    });
    user.save(function(err){
        console.log(err);
        if(err){
            return res.render('users',{
                //error:utils.errors(err.errors),
                user:user,
                title: 'Sign up'
            });
        }
        console.log("user saved");
    });
};

exports.getList = function (req, res){
    /*
    User.find({}, function(err, users){
        users.forEach(function(user){
            console.log(user.password);
        });
    });*/

    var user = new User({
        name: "edward",
        email: "stumbledog@gmail.com"
    });

    user.setPassword("qwer1234");
    console.log(user.authentication("qwer1234"));

    console.log(user);
};