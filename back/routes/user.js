import { Router } from 'express';
import { register, signIn, signOut } from '@models';

const userRouter = Router();

userRouter.post('/register', async function (req, res) {
	const response = await register(req.body.input);
	res.status(200).send(response);
});

userRouter.post('/signIn', async function (req, res) {
	const response = await signIn(req.body.input);
	res.status(200).send(response);
});

userRouter.post('/signOut', async function (req, res) {
	res.status(200).send("Logout");
})

export default userRouter;
