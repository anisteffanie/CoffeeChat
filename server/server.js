var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var port = process.env.PORT || 8800;
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors');

//require('events').EventEmitter.defaultMaxListeners = Infinity;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client'));
app.use(cors());




app.use('/api/signup', require('./routes/signupRoute.js'));
app.use('/api/signin', require('./routes/signinRoute.js'));

http.listen(port, function() {
  console.log('Listening on port ' + port);
});