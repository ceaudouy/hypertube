'use strict'
const mysql = require('mysql');

//#ceaudouy mac

const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port     : 3306,
  password : 'qwerty',
  database : 'db_hypertube',
});

const con_1 = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	port     : 3306,
	password : 'qwerty',
  });

module.exports.con_1 = con_1;

//#########################\

//#ceaudouy home

// const con = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'db_hypertube'
// });

//#########################\

//#marferna ecole

// const con = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	port     : 3306,
// 	password : 'marine',
// 	database : 'db_hypertube'
// });

// const con_1 = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	port     : 3306,
// 	password : 'marine',
//   });

// module.exports.con_1 = con_1;

//#########################\

//#marferna home

// const con = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   port     : 3308,
//   password : 'marine',
//   database : 'db_hypertube'
// });

//#########################\



module.exports.con = con;
