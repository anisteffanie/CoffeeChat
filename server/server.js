var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http').Server(app);
var port = process.env.PORT || 8800;
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
//var csrf = require('csurf');

//var cors = require('cors');
var session = require('client-sessions');

//the secret key for authenthication is in a separate module and is gitignored
var secret = require('./db/secret.js');
app.use(session(secret));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(express.static(__dirname + '/../client'));
//app.use(csrf());
//app.use(cors());


app.use('/api/signup', require('./routes/signupRoute.js'));
app.use('/api/signin', require('./routes/signinRoute.js'));
app.use('/api/dashboard', require('./routes/dashboardRoute.js'));


http.listen(port, function() {
  console.log('Listening on port ' + port);
});