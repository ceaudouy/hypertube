const db = require('../../server');
const jwt = require('jsonwebtoken');

const conn = db.conn;

function signOut(user) {
	return new Promise ((resolve, reject) => {
		const token = localStorage.getItem('token');
		// const checkToken = jwt.verify(token, 'qetuoadgjlxvnwryipsfhkzcbma');
		// const loginToken = checkToken.loginId;
		// const idToken = checkToken.userId;

		console.log('ccc')
	})
}

module.exports.signOut = signOut;
