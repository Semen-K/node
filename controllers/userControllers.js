var express = require('express'),
	router = express.Router();

var bcrypt = require('bcrypt');	

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('cookie-session');
app.use(session({keys:['secret']}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var mysql = require('mysql');
var config = require('../config')
var pool = mysql.createPool(config.db);		