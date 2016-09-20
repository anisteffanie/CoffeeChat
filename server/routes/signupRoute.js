var express = require('express');
var router = express.Router();
var newUser = require('../db/db.js')

router.post('/', function(req, res){
	var user = newUser({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userName: req.body.username,
		password: req.body.password,
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