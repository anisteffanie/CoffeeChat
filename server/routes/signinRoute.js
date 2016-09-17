var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	console.log('signin request', req.body);
	res.send('server response to signin request');
})

module.exports = router; 