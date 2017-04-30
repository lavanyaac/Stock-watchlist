var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stockswatchlist');

var usersSchema = mongoose.Schema({
	username: String,
	password: String,
	salt: String
});
var stocksSchema = mongoose.Schema({
	username: String,
	stocks: Array
});

module.exports = {
    Stocks: mongoose.model('Stocks', stocksSchema),
    Users: mongoose.model('Users', usersSchema),
}