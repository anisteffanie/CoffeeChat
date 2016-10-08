var express = require('express');
var fs = require('fs')
var path = require('path')
var router = express.Router();
var users = require('../db/db.js');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream')
var connection = mongoose.connection;
Grid.mongo = mongoose.mongo;

//middleware
router.use(function(req, res, next){
	if(req.session && req.session.user){
		users.findOne({userName: req.session.user.userName}, function(err, user){
			if(user){
				req.user = user;
				req.user.passWord = '';
				req.session.user = req.user;
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

router.get('/profilePic', requireSignin, function(req, res){
	var userImg;
	var id = req.session.user._id;
	connection.open('open', function(){
		console.log('getting the photo');
		var gfs = Grid(connection.db);
		var readstream = gfs.createReadStream({
			filename:  mongoose.Types.ObjectId(req.session.user._id)
		})
		readstream.on('data', function(data){
			var userImg = data;
			res.send(userImg);
		})
	})
})

router.post('/editProfile', function(req, res){
	var toBeEdited = req.body.tobeEdited;
	var set = {};
	set[toBeEdited] = req.body.newValue;
	
	users.findOneAndUpdate({userName: req.session.user.userName}, {$set: set}, {upsert: true}, function(err){
		console.log(err);
	})
	res.send();
})

router.post('/addPhoto', function(req, res){
	var id = req.session.user._id;
	fs.writeFileSync('./routes/temp.js', req.body.file)
	var photoPath = path.join(__dirname,'./temp.js')
	console.log(photoPath)
	connection.open('open', function(){
		console.log('connection open');
		var gfs = Grid(connection.db);
		var writestream = gfs.createWriteStream({
			filename: id
		});
		fs.createReadStream(photoPath).pipe(writestream);
		writestream.on('close', function(file){
			console.log(file.filename + " writen to db")
		})
	})
		console.log(req.body.file);
		res.send(req.body.file); 
}) 

module.exports = router;