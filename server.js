'use strict'
const bodyParser = require('body-parser');
const express = require('express');
const bdd = require("./db_connect.js");

//connect to bdd
let con = bdd.con;
con.connect();

con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
});

const server = express();

server.set('port', process.env.PORT || 8080);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

// CORS requests
const cors = require('cors')
server.options("http://localhost:3000", cors());
server.use(cors({origin: "http://localhost:3000", credentials: true}));
// disables 'x-powered-by', this makes it more difficult for users to see that we are using Express.
server.disable('x-powered-by');

server.set('trust proxy', 1)

//set up routes

// const authRoutes = require('./routes/auth.js');
// server.use('/auth', authRoutes);

server.use((req, res) => {
	res.type('text/plain');
	res.status(505);
	res.send('Error page');
});

server.listen(8080);