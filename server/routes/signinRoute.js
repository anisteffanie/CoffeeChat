var express = require('express');
var router = express.Router();
var users = require('../db/db.js');
var session = require('client-sessions');
var bcrypt = require('bcryptjs');

//the secret key for authenthication is in a separate module and is gitignored
var secret = require('../db/secret.js');


router.post('/', function(req, res){
	users.findOne({userName: req.body.username}, function(err, user){
		if(!user) {
			res.send('user does not exist');
		}
		else if(bcrypt.compareSync(req.body.password, user.passWord)){
				req.session.user = user; // set cookie
				res.send();
			}
		else {
			
			res.send('wrong password');
		}
		
	})
})

module.exports = router; 





