import { Router } from 'express';

import { Comment, Favorite, View, User } from 'models';
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

movieRouter.post('/getComment', async (req, res, next) => {
	try {
		const { type, movie } = req.body;
		const response = await Comment.add(type, movie);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.post('/getFavorites', auth, async (req, res, next) => {
	try {
		const response = await User.favorite(req.user.id)
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.post('/addFavorites', auth, async (req, res, next) => {
	try {
		const { id, type } = req.body;
		const response = Favorite.add(id, type, req.user.id);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

movieRouter.post('/getViews', auth, async (req, res) => {
	try {
		const response = await User.views(req.user.id);
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

export default movieRouter;
