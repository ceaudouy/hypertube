import { Router } from 'express'

import { User } from 'models'
import { passport, auth, ErrorHandler } from 'middlewares'

const userRouter = Router()

userRouter.get('/', auth, (req, res) => {
  res.status(200).json(req.user)
})

userRouter.get('/github', passport.authenticate('github', { session: false }))

userRouter.get(
  '/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    console.log(req.user)
    res.status(200).json({ token: req.user.token })
  }
)

userRouter.get('/fortytwo', passport.authenticate('fortytwo', { session: false }));

userRouter.get('/fortytwo/callback', passport.authenticate('fortytwo', { session: false }), (req, res) => {
	console.log(req.user);
	res.status(200).json({ token: req.user.token });
})

userRouter.post('/register', async (req, res, next) => {
  try {
    const { firstname, lastname, email, login, password } = req.body
    if (!password) throw new ErrorHandler(400, 'Missing required fields')
    const response = await User.register({
      firstname,
      lastname,
      email,
      login,
      password,
    })
    delete response.password
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/signIn', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const response = await User.signIn({ email, password })
    res.status(200).json({ token: response })
  } catch (err) {
    next(err)
  }
})

userRouter.post('/signOut', auth, async (req, res, next) => {
	try {
		User.signOut(req.user);
		res.status(200).send();
	} catch (err) {
		next(err);
	}
});

userRouter.post('/update', async (req, res, next) => {
	try {
		const { firstname, lastname, login, email, password, pathImage } = req.body;
		const response = await User.edit({ firstname, lastname, login, email, password, pathImage });
		delete response.password;
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
});

export default userRouter
