const router = require('express').Router();

router.post('/comment', async function (req, res) {
	const file = require('../back/movies/comment.js');
	const response = await file.comment(req.body, 'ceaudouy'); //ceaudouy = login user qui commente a remplacer
	res.status(200).send(response);
});

router.post('/getComment', async function (req, res) {
	const file = require('../back/movies/comment.js');
	const response = await file.getComment(req.body.type, req.body.movie);
	res.status(200).send(response);
});


module.exports = router;
