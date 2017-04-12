var express = require('express');
var fs =require('fs');
var app = express();
var cookieParser = require('cookie-parser');
	app.use(cookieParser());

var bodyParser = require('body-parser');
	app.use(bodyParser());

var path =	require('path');
	app.use(express.static('static'));

var mysql = require('mysql');
var config = require('./config');
var pool = mysql.createPool(config.db);

var session = require('cookie-session');
	app.use(session({keys:['secret']}));

var bcrypt = require('bcrypt'),
    saltRounds = 10;

var passport = require('passport');
	app.use(passport.initialize());
	app.use(passport.session());


var templating = require('consolidate');
	app.engine('hbs', templating.handlebars);
	app.set('view engine', 'hbs');
	app.set('views',path.join(__dirname + '/views'));

// var routModel = require('./models/routModel')();
// 
var AuthenUsers = require('./models/Model_BD')(pool, mysql);

var LocalStrategy = require('passport-local').Strategy;
	passport.use(new LocalStrategy(	{
			usernameField: 'username',
			passwordField: 'password'
			},
			function(username, password, done) {
				AuthenUsers.findNameUser(username, function(err, result){
					if (err) {
						 return done(err); 
					}
					bcrypt.compare(password, result[0].password, function(err, resp) {
						if (resp){
							return done(null, result[0]);	
						}	
						return done(null, false, {massege: 'Неверный логин или пороль!!!'});				
			    	});				
				});		
			}	
	));

passport.serializeUser(function(user,done){
	done(null, user.name);
});

passport.deserializeUser(function(id, done) {
	done(null, {username: id } );
});

var auth = passport.authenticate('local', {
		successRedirect: '/user',
		failureRedirect: '/login'
	}
);
app.get('/', function(req, res){
			 // res.write(fs.readFileSync('views/index.html'));
			res.render('primary', { massege :'Здараствуйте!!! Вас приветствует!!!'});
		});

// app.get('/login', routModel.returnFormLogin);

app.get('/user', auth);

app.post('/login', auth);

app.post('/registr', function(req, res){
	AuthenUsers.findNameUser(req.body.username, function(err, result){
		   	if (err) {		
				return err;
			}; 			
			if (result == false){
				bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
					AuthenUsers.UploadUser(req.body.username, hash, function(err, result){						
						if (err) {return err;}
						"вернуть ответ пользвотелю" 	
					});		
			    });
			}
		});
});	




var mustBeAuthenticated = function(req, res, next){
	req.isAuthenticated() ? next() : res.redirect('/all');
}


app.all('/all/',  function(req,res){
	res.send(200, 'Перешли на обще доступную страницу');
})

app.all('/all/*',  function(req,res){
	res.send(200, 'Сюда могут ходить все');
})

app.all('/user', mustBeAuthenticated);
app.all('/user/*', mustBeAuthenticated);


app.get('/user', function(req,res){
	res.send(200, 'Перешли на новую страницу');
})

app.get('/user/sec', function(req,res){
	res.send(200, 'Перешли на новую страницу секретную страницу');
})


app.get ('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.listen(8080);
console.log("Старт");


 
