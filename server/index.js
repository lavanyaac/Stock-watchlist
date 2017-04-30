var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index');

var session = require('express-session')

var app = express();
console.log('Hi server');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
	 secret: 'keyboard cat',
	 resave: false,
	 saveUninitialized: true,
     cookie: { secure: !true }
}));


app.use(verifySession,express.static(__dirname + '/../client/dist'));

function verifySession(req, res, next){
	if(req.url.startsWith("/login")){
		next();
	}else if(req.url.startsWith("/signup")){
		next();
	}else if(req.session && req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}

app.get('/login', function(request, response){
	response.status(200).send('<form method="post" action="/login">' +
  '<p>' +
    '<label>Username:</label>' +
    '<input type="text" name="username">' +
  '</p>' +
  '<p>' +
    '<label>Password:</label>' +
    '<input type="text" name="password">' +
  '</p>' +
  '<p>' +
    '<input type="submit" value="Login">' +
  '</p>' +
  '</form>');

});

app.post('/login', function(request, response){
	var username = request.body.username;
	var password = request.body.password;

	db.Users.findOne({
		$and: [{username: username}, {password: password}]}, function(err, user){
			if(user){
				request.session.regenerate(function(){
					request.session.user = username;
					response.redirect('/'); 
				});
			}else{
				response.redirect('/login');
			}

		});
});


app.get('/signup', function(request, response){
	response.status(200).send('<form method="post" action="/signup">' +
  '<p>' +
    '<label>Username:</label>' +
    '<input type="text" name="username">' +
  '</p>' +
  '<p>' +
    '<label>Password:</label>' +
    '<input type="text" name="password">' +
  '</p>' +
  '<p>' +
    '<input type="submit" value="Signup">' +
  '</p>' +
  '</form>');

});

app.post('/signup', function(request, response){
	var username = request.body.username;
	var password = request.body.password;

	db.Users.collection.insertOne ({
	    username:username,
	    password:password,
	    salt:"aaa"
	}, function(err, res){
		if(err){
			console.log(err);
		}
	});

	db.Stocks.collection.insertOne({
		username : username, 
        stocks:['^IXIC']
    }, function(err, res){
    	if(err){
    		console.log(err);
    	}
    });
 	response.redirect('/login');
})

// app.post('/stocks/add', function(request, res){
// 	// db.collection.insertOne ({
// 	//     symbol: "AAPL",
// 	// 	AverageDailyVolume: "25228300",
// 	// 	Change_PercentChange: "-0.14 - -0.10%",
// 	// 	DaysLow: "143.27",
// 	// 	DaysHigh: "144.30",
// 	// 	YearLow: "143.27",
// 	// 	YearHigh: "145.46"
// 	// })
	
// });

app.get('/stocks', function(req, res){
  console.log('request method '+ req.method + ' request url ' + req.url);
  console.log('request body', req.session.user);
  var newData = [];
  db.Stocks.findOne({ username: req.session.user}, function(err, stockList){
  	if(stockList){
  		res.status(200).send(JSON.stringify(stockList.stocks));
  	}
  });
});

var port = 1128;
app.listen(port, function(){
	console.log(`listening on port ${port}`);
})