var express = require('express');
var router = express.Router();
var users = require('../db/db.js');
var session = require('client-sessions');

router.get('/', function(req, res){
	if(req.session && req.session.user){
		users.findOne({userName: req.body.username}, function(err, user){
			if(!user){
				req.session.reset();
				res.redirect('/');
			}
			else {
				res.locals.user = user;
				console.log('user logged in dashboard')
			}
		})
	}
	else {
		res.redirect('/')
	}
})

module.exports = router;