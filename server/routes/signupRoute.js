var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
	console.log(req.body);
	res.send('server response to signup request')
}) 

module.exports = router;