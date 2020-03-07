const db = require('../../server');
const bcrypt = require('bcrypt');
const ent = require('ent');

const conn = db.conn;

function signIn(user) {
	return new Promise ((resolve, reject) => {
		const login = user.login;
		const password = user.password;

		if (login != undefined && password != undefined) {
			let sql = 'SELECT login, password FROM users WHERE login = ?';
			let value = [
				[ent.encode(login)]
			];
			conn.query(sql, value, function (err, res) {
				if (err) { reject(Error('Error')); }
				if (res != '') {
					const passwordDB = res[0].password;

					if (bcrypt.compareSync(password, passwordDB) === true) {

					}
					else if (bcrypt.compareSync(password, passwordDB) === false) {
						resolve({error: 'Your login or password is invalid!'});
					}
				}
				else { resolve({error: 'Your login or password is invalid!'}); }
			})
		}
		else { resolve({error: 'Incomplete fields!'}); }
	})
}

module.exports.signIn = signIn;
