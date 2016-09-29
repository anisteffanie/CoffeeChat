var express = require('express');
var router = express.Router();
var users = require('../db/db.js');
var session = require('client-sessions');

//middleware
router.use(function(req, res, next){
	if(req.session && req.session.user){
		users.findOne({userName: req.session.user.userName}, function(err, user){
			if(user){
				req.user = user;
				req.user.passWord = '';
				req.session.user = req.user
				res.locals.user = req.user;
				req.user = user;
			}
			next();
		});
	}
	else {
		next();
	}
});

function requireSignin(req, res, next){
	console.log('require signin')
	if(!req.user){
		console.log('no user')
		res.redirect('/');
	}
	else {
		next();
	}
}

router.get('/getUser', requireSignin, function(req, res){
	res.send(res.locals.user);
});

router.post('/editProfile', function(req, res){
	var toBeEdited = req.body.tobeEdited;
	var set = {};
	set[toBeEdited] = req.body.newValue;
	console.log('set ' + req.session.user.userName)

	users.findOneAndUpdate({userName: req.session.user.userName}, {$set: set}, {upsert: true}, function(err){
		console.log(err);
	})
	res.send();
})

module.exports = router;