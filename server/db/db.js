var mongoose = require('mongoose');
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development" ;

mongoose.connect('mongodb://localhost/coffeeChat');

var Schema = mongoose.Schema;
var objectId = Schema.ObjectId
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function(){
	console.log('mongoDB connected');
})

var users = new Schema({
	id: objectId,
	firstName: String,
	lastName: String,
	userName: {type: String, unique: true}, 
	passWord: String,
	favoriteCoffee: String,
	aboutMe: String,
	havingCoffeeAt: {lat: {type: Number}, lng: {type: Number}},
	rating: Number
})

var User = mongoose.model('users', users);

module.exports = User;