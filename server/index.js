var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index');

var app = express();
console.log('Hi server');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static(__dirname + '/../client/dist'));
app.post('/stocks/add', function(req, res){
	db.collection.insertOne ({
	    symbol: "AAPL",
		AverageDailyVolume: "25228300",
		Change_PercentChange: "-0.14 - -0.10%",
		DaysLow: "143.27",
		DaysHigh: "144.30",
		YearLow: "143.27",
		YearHigh: "145.46"
	})
	
});

app.get('/stocks', function(req, res){
  console.log('request method '+ req.method + ' request url ' + req.url);
  console.log('request body', req.body);
  var newData = [];
  db.collection.find().stream()
  	.on('data', function(row){
  		newData.push(row);
  	})
  	.on('end', function(){
  		res.status(200).send(JSON.stringify(newData));
  	})
});

var port = 1128;
app.listen(port, function(){
	console.log(`listening on port ${port}`);
})