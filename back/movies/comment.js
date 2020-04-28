const db = require('../../server');
const conn = db.conn;
//encode
function comment(info, login) {
	return new Promise((resolve, reject) => {
		console.log(info)
		let sql = "INSERT INTO comment (login, type, movie, comment) VALUES ?";
		let values = [
			[login, info.type, info.movie.toString(), info.comment]
		];
		conn.query(sql, [values], function(err, result) {
			if (err) throw err;
			resolve({ok: "ok"});
		})
	}) 
}
module.exports.comment= comment;

function getComment(type, movie) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM comment WHERE type = ? AND movie = ?";
		let values = [
			[type], [movie]
		];
		conn.query(sql, values, function (err, result) {
			if (err) throw err;
			resolve(result)
		})
	})
}
module.exports.getComment = getComment;