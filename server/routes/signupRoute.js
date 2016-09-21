var express = require('express');
var router = express.Router();
var newUser = require('../db/db.js');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');

//the secret key for authenthication is in a separate module and is gitignored
var secret = require('../db/secret.js');


router.post('/', function(req, res){
	var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	var user = newUser({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.username,
		passWord: hashedPassword,
		favoriteCoffee: req.body.favoriteCoffee
	})
	user.save(function(err){
		if(err) {
			var defaultErrorMessage = 'An error occurred. Please try again.'
			if(err.code === 11000){
				defaultErrorMessage = 'The username is taken. Please sign up with another one';
			}	
			res.send(defaultErrorMessage);
		}
		else {
			console.log('a new user signed up')
		}
	})


}) 
module.exports = router;