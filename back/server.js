'use strict'
const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require("body-parser");
// Get data easily from road (ex: via form)
const app = express();

const conn = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'marine',
	database	: 'db_hyperloop',
	port		: 3306
	});
	conn.connect(function(err) {
		if (err) throw err;
		console.log("Connected to MySQL !");
});

module.exports.conn = conn;

const urlencodedParser = bodyParser.urlencoded({
	extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(express.json());

// Det CORS
app.options("http://localhost:3000", cors());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
// disables 'x-powered-by', this makes it more difficult for users to see that we are using Express
app.disable('x-powered-by');
app.set('trust proxy', 1);

const homepageRoutes = require('../api/homepage.js');
app.use('/home', homepageRoutes);

// ERROR PAGES
app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Not found !');
});

// Listening Port
app.listen(3300);
