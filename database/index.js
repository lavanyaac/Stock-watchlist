var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stockswatchlist');

var stockSchema = mongoose.Schema({
	symbol: String,
	AverageDailyVolume: String,
	Change_PercentChange: String,
	DaysLow: String,
	DaysHigh: String,
	YearLow: String,
	YearHigh: String
});

var Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;