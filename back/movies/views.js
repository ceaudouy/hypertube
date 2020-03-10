const db = require('../../server');

const conn = db.conn;

function getViews(id) {
	return new Promise((resolve, reject) => {
		let sql = "SELECT * FROM Views WHERE id_user = ?";
		let value = [
			[id]
		]
		conn.query(sql, value, function(err, res) {
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
module.exports.getViews = getViews;