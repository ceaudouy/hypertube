const router = require('express').Router();

// Road for BACK-END
router.post('/getFavorites', async function (req, res) {
	const file = require('../back/movies/favorites');
	const response = await file.getFavorites(req.body.type, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});

router.post('/addFavorites', async function (req, res) {
	const file = require('../back/movies/favorites');
	const response = await file.addFavorites(req.body.id, req.body.type, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});

router.post('/getViews', async function (req, res) {
	const file = require('../back/movies/views');
	const response = await file.getViews(req.body.type, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});

module.exports = router;
