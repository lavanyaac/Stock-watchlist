var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index');
var session = require('express-session')

var app = express();


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
	if(req.url.startsWith("login.html") || req.url.endsWith("css")){
		next();
	}else if(req.url.startsWith("/login")){
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
	response.redirect('login.html#login');
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
	response.redirect('login.html#signup');
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

app.post('/stocks/add', function(req, res){
	db.Stocks.findOneAndUpdate(
	   { username: req.session.user},
	    { $push: { stocks: req.body.stock } },
	    function(err, data) {
	        console.log(err);
	});
	res.status(201).send("success");
});

app.get('/stocks', function(req, res){
  db.Stocks.findOne({ username: req.session.user}, function(err, stockList){
  	if(stockList){
  		res.status(200).send(JSON.stringify(stockList.stocks));
  	}
  });
});

app.delete('/stocks', function(req, res){
	db.Stocks.findOneAndUpdate(
	    { username: req.session.user},
	    { $pull: { stocks: req.body.stock } },
	    function(err, data) {
	        console.log(err);
	});
	res.status(202).send("success - marked for deletion");

})

var port = 1128;
app.listen(port, function(){
	console.log(`listening on port ${port}`);
})