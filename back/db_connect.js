'use strict'
const mysql = require('mysql');

//#ceaudouy mac

const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : 3306,
  password : 'qwerty',
  database : 'db_matcha',
});

con.connect();

con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
});

module.exports.con = con;