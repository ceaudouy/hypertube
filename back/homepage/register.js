const db = require('../../server');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
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
				if (err) { reject(Error('Error')); }
				if (res != '') { resolve({ error: 'Login or email already taken!' }); }
				else {
					let safePassword = new passwordValidator();
					safePassword
					.is().min(8)
					.is().max(50)
					.has().uppercase()
					.has().lowercase()
					.has().digits()
					.has().not().spaces();
					if (safePassword.validate(password) === true) {
						if (emailValidator.validate(email) === true) {
							const salt = bcrypt.genSaltSync(10);
							const passwordHash = bcrypt.hashSync(password, salt);
							let sql = 'INSERT INTO users (first_name, last_name, login, password, email) VALUES ?';
							let values = [
								[ent.encode(firstname), ent.encode(lastname), ent.encode(login), ent.encode(passwordHash), ent.encode(email)]
							];
							conn.query(sql, [values], function (err, res) {
								if (err) { reject(Error('Error')); }
								if (res) { resolve({ success: 'Account created with success!' }); }
							})
						}
						else if (emailValidator.validate(email) === false) {
							resolve({ error: 'Your email is invalid!' });
						}
					}
					else if (safePassword.validate(password) === false) {
						resolve({ error: 'Your password must contain 8 characters, uppercase, lowercase, no spaces and a number!' });
					}
				}
			});
		}
		else { resolve({ error: 'Incomplete fields!' }); }
	})
}

module.exports.register = register;
