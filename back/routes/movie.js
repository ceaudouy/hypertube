import { Router } from 'express';
import {comment, getComment, getFavorites, addFavorites, getViews} from '@models';

const movieRouter = Router();

movieRouter.post('/comment', async function (req, res) {
	const response = await comment(req.body, 'ceaudouy'); //ceaudouy = login user qui commente a remplacer
	res.status(200).send(response);
});

movieRouter.post('/getComment', async function (req, res) {
	const response = await getComment(req.body.type, req.body.movie);
	res.status(200).send(response);
});

movieRouter.post('/getFavorites', async function (req, res) {
	const response = await getFavorites(req.body.type, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});

movieRouter.post('/addFavorites', async function (req, res) {
	const response = await addFavorites(req.body.id, req.body.type, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});

movieRouter.post('/getViews', async function (req, res) {
	const response = await getViews(req.body.type, 1); //1 = id_user a remplacer
	res.status(200).send(response);
});

export default movieRouter;
