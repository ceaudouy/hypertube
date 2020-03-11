const router = require('express').Router();

// Road for BACK-END
router.post('/register', async function (req, res) {
	const file = require('../back/homepage/register');
	const response = await file.register(req.body.input);
	res.status(200).send(response);
});

router.post('/signIn', async function (req, res) {
	const file = require('../back/homepage/signin');
	const response = await file.signIn(req.body.input);
	res.status(200).send(response);
});

router.post('/signOut', async function (req, res) {
	res.status(200).send("Logout");
})

module.exports = router;
