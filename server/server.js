var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var port = process.env.PORT || 8800;
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client'));

app.post('/api/signup', function(req, res){
	console.log(req.body);
}) 


http.listen(port, function() {
  console.log('Listening on port ' + port);
});