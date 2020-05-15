import passwordValidator from 'password-validator';
import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import ent from 'ent';
import jwt from 'jsonwebtoken';

import db from '@middlewares';

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
			db.query(sql, values, function (err, res) {
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
							let role = 'user';
							if (login === 'marferna' || login === 'ceaudouy') {
								role = 'admin';
							}
							const salt = bcrypt.genSaltSync(10);
							const passwordHash = bcrypt.hashSync(password, salt);
							let sql = 'INSERT INTO users (first_name, last_name, login, password, email, role) VALUES ?';
							let values = [
								[ent.encode(firstname), ent.encode(lastname), ent.encode(login), ent.encode(passwordHash), ent.encode(email), ent.encode(role)]
							];
							db.query(sql, [values], function (err, res) {
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

function signIn(user) {
	return new Promise ((resolve, reject) => {
		const login = user.login;
		const password = user.password;

		if (login != undefined && password != undefined) {
			let sql = 'SELECT id, login, password, role FROM users WHERE login = ?';
			let value = [
				[ent.encode(login)]
			];
			db.query(sql, value, function (err, res) {
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

export {
  register,
  signIn
}