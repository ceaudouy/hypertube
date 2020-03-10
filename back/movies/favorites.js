const db = require('../../server');

const conn = db.conn;

function getFavorites(id_user) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM favorites WHERE id_user = ?";
		let values = [
			[id_user]
		]
		conn.query(sql, values, function (err, res) {
			if (err) throw err;
			var fav = [];
			if (res != '') {
				var i = 0;
				while (res[i] != undefined) {
					fav[i] = res[i].id_movie;
					i++;
				}
			}
			resolve({ favorites: fav });
		})
	})
}

module.exports.getFavorites = getFavorites;

function addFavorites(id_movie, id_user) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM favorites WHERE id_movie = ? AND id_user = ?";
		let values = [
			[id_movie], [id_user]
		]
		conn.query(sql, values, function (err, res) {
			if (err) throw err;
			if (res == '') {
				sql = "INSERT INTO favorites (id_movie, id_user) VALUES ?";
				values = [
					[id_movie, id_user]
				]
				conn.query(sql, [values], function (err, res) {
					if (err) throw err;
					resolve ({ response: "addMovie" });
				})
			} else {
				sql = "DELETE FROM favorites WHERE id_movie = ? AND id_user = ?";
				conn.query(sql, values, function (err, res) {
					if (err) throw err;
					resolve ({ response: "deleteMovie" });
				})
			}
		})
	})
}

module.exports.addFavorites = addFavorites;
