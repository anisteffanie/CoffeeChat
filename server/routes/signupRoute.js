var express = require('express');
var router = express.Router();
var newUser = require('../db/db.js');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');


//the secret key for authenthication is in a separate module and is gitignored
var secret = require('../db/secret.js');

// router.get('/csrf', function(req, res){
// 	var genCsrf = { csrfToken: req.csrfToken()};
// 	res.send(genCsrf);
// })

router.post('/', function(req, res){
	var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	
	var user = newUser({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.username,
		passWord: hashedPassword,
		favoriteCoffee: req.body.favoriteCoffee,
		aboutMe: req.body.aboutMe,
		rating: req.body.rating
	})
	user.save(function(err){
		if(err) {
			var defaultErrorMessage = 'An error occurred. Please try again.'
			if(err.code === 11000){
				defaultErrorMessage = 'Username is taken';
			}	
			res.send(defaultErrorMessage);
		}
		else {
			res.send('successful signup');
		}
	})
}) 

module.exports = router;