import { Router } from 'express';

import { Comment, Favorite, User } from 'models';
import { auth } from 'middlewares';

const movieRouter = Router();

movieRouter.post('/comment', auth, async (req, res, next) => {
	try {
		const response = await Comment.add(req.body, req.user);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.get('/comment', async (req, res, next) => {
	try {
		const { type, movie } = req.body;
		const response = await Comment.add(type, movie);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.get('/favorites', auth, async (req, res, next) => {
	try {
		const response = await User.favorite(req.user.id)
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.post('/favorites', auth, async (req, res, next) => {
	try {
		const { id, type } = req.body;
		const response = Favorite.add(id, type, req.user.id);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.get('/views', auth, async (req, res, next) => {
	try {
		const response = await User.views(req.user.id);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

export default movieRouter;
