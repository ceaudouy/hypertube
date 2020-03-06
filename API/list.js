const router = require('express').Router();

router.get('/getFavorites', async function(req, res) {
	const favorite = require('../back/favorites');
	const response = await favorite.getFavorites(1); //1 = id_user a remplacer
	res.status(200).send(response);
});

router.post('/addFavorites', async function(req, res) {
	const favorite = require('../back/favorites');
	const response = await favorite.addFavorites(req.body.id, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});
module.exports = router;