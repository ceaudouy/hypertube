const db = require('../../server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ent = require('ent');
const FortyTwoStrategy = require('passport-42').Strategy;

const conn = db.conn;

function signIn(user) {
	return new Promise ((resolve, reject) => {
		const login = user.login;
		const password = user.password;

		if (login != undefined && password != undefined) {
			let sql = 'SELECT id, login, password, role FROM users WHERE login = ?';
			let value = [
				[ent.encode(login)]
			];
			conn.query(sql, value, function (err, res) {
				if (err) { reject(Error('Error')); }
				if (res != '') {
					const userIdDB = res[0].id;
					const loginDB = res[0].login
					const passwordDB = res[0].password;
					const role = res[0].role;

					if (bcrypt.compareSync(password, passwordDB) === true) {
						const token = jwt.sign({ userId: userIdDB, loginId: loginDB, role: role }, 'qetuoadgjlxvnwryipsfhkzcbma');
						resolve ({ success: token });
					}
					else if (bcrypt.compareSync(password, passwordDB) === false) {
						resolve({ error: 'Your login or password is invalid!' });
					}
				}
				else { resolve({ error: 'Your login or password is invalid!' }); }
			})
		}
		else { resolve({ error: 'Incomplete fields!' }); }
	})
}

module.exports.signIn = signIn;
