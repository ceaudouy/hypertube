const db = require('../../server');
const bcrypt =  require ( 'bcrypt' );
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
				if (err) { reject(Error('error')); }
				if (res != '') {
					resolve({error: 'Login or email already taken!'});
				}
				else {
					if ()
					let sql = 'INSERT INTO users (first_name, last_name, login, password, email) VALUES ?';
					let values = [
						[ent.encode(firstname), ent.encode(lastname), ent.encode(login), ent.encode(password), ent.encode(email)]
					];
					conn.query(sql, [values], function (err, res) {
						console.log('errir')
						if (err) { reject(Error('error')); }
					})
					resolve({success: 'Account created with success!'})
				}
			});
		}
		else {
			resolve({error: 'Incomplete fields!'});
		}
	})
}

module.exports.register = register;

// bcrypt.hashSync(ent.encode(user.passwd, 8))
bcrypt . hash ( 'myPassword' ,  10 ,  fonction ( err , hash )  {
	// Stocker le hachage dans la base de données
  } );
