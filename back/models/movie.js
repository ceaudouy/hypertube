import db from '@middlewares';

//encode
function comment(info, login) {
	return new Promise(( resolve ) => {
		let sql = "INSERT INTO comment (login, type, movie, comment) VALUES ?";
		let values = [
			[login, info.type, info.movie.toString(), info.comment]
		];
		db.query(sql, [values], function(err, result) {
			if (err) throw err;
			resolve({ok: "ok"});
		})
	}) 
}

function getComment(type, movie) {
	return new Promise(( resolve ) => {
		let sql = "SELECT * FROM comment WHERE type = ? AND movie = ?";
		let values = [
			[type], [movie]
		];
		db.query(sql, values, function (err, result) {
			if (err) throw err;
			resolve(result)
		})
	})
}

function getFavorites(type, id_user) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM favorites WHERE id_user = ? AND type = ?";
		let values = [
			[id_user], [type]
		]
		db.query(sql, values, function (err, res) {
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

function addFavorites(id_movie, type, id_user) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM favorites WHERE id_movie = ? AND id_user = ? AND type = ?";
		let values = [
			[id_movie], [id_user], [type]
		]
		db.query(sql, values, function (err, res) {
			if (err) throw err;
			if (res == '') {
				sql = "INSERT INTO favorites (id_movie, id_user, type) VALUES ?";
				values = [
					[id_movie, id_user, type]
				]
				db.query(sql, [values], function (err, res) {
					if (err) throw err;
					resolve ({ response: "addMovie" });
				})
			} else {
				sql = "DELETE FROM favorites WHERE id_movie = ? AND id_user = ? AND type = ?";
				db.query(sql, values, function (err, res) {
					if (err) throw err;
					resolve ({ response: "deleteMovie" });
				})
			}
		})
	})
}

function getViews(type, id) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM Views WHERE id_user = ? AND type = ?";
		let value = [
			[id], [type]
		]
		db.query(sql, value, function(err, res) {
			if (err) throw err;
			var views = [];
			if (res != '') {
				let i = 0;
				while (res[i] != undefined) {
					views[i] = res[i].id_movie;
					i++;
				}
			}
			resolve({ views: views });
		})
	})
}

export {
  comment,
  getComment,
  getFavorites,
  addFavorites,
  getViews
}