const router = require('express').Router();

// Road for BACK-END
router.post('/register', function(req, res) {
	const file = require('../back/homepage/register');
	file.register(req.body.input).then((resolve) => {
		res.status(200).send(resolve);
	})
});

router.post('/signIn', function(req, res) {
	const file = require('../back/homepage/signin');
	file.signIn(req.body.input).then((resolve) => {
		res.status(200).send(resolve);
	})
});

module.exports = router;
