// const mysql = require('mysql');
const db = require('../server.js');
const ent = require('ent');

const conn = db.conn;

function register(user) {
	return new Promise ((resolve, reject) => {
		const firstname = user.firstname;
		const lastname = user.lastname;
		const login = user.login;
		const password = user.password;
		const email = user.email;

		if (firstname != undefined && lastname != undefined && login != undefined && password != undefined && email != undefined) {
			let sql = 'SELECT * FROM users WHERE login = ? OR email = ?';
			let values = [
				[ent.encode(login)], [ent.encode(email)]
			];
			conn.query(sql, values, function (err, res) {
				console.log(res)
				if (err) throw err;
				if (res.login != login && res.email != email) {
					resolve({response: 'Ok'});
				}
				else if (res.login === login || res.email === email) {
					resolve({error: 'Login or email already taken!'});
				}
			});
		}
		else {
			resolve({error: 'Incomplete fields!'});
		}
	})
}

module.exports.register = register;
