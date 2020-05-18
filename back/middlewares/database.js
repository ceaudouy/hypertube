import mysql from 'mysql';

const database = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	password	: 'qwerty',
	database	: 'db_hyperloop',
	port		: 3306,
	});
	
export default database.connect(function (err) {
		if (err) throw err;
		console.log("Connected to MySQL !");
});