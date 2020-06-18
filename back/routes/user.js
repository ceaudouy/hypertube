import { Router } from 'express'

import { User, Reset } from 'models'
import { mailer, resetMail } from 'services'
import { passport, auth, ErrorHandler, upload } from 'middlewares'

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

userRouter.get('/fortytwo', passport.authenticate('42', { session: false }))

userRouter.get(
  '/fortytwo/callback',
  passport.authenticate('42', { session: false }),
  (req, res) => {
    console.log(req.user)
    res.status(200).json({ token: req.user.token })
  }
)

userRouter.post('/register', async (req, res, next) => {
  try {
    const { firstname, lastname, email, login, password } = req.body
    if (!password) throw new ErrorHandler(400, 'Missing required fields')
    await User.register({
      firstname,
      lastname,
      email,
      login,
      password,
    })
    res.status(200).send()
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
    User.signOut(req.user)
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/update', auth, async (req, res, next) => {
  try {
    const response = await User.edit(req.user, req.body)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/request', async (req, res, next) => {
  try {
    const { email } = req.body
    const mail = await mailer()
    const reset = await Reset.request(email)
    if (reset) mail.sendMail(resetMail(reset, req.get('origin')))
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/reset/:token', async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body
    await Reset.verify(token, password)
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})

userRouter.post('/picture', [auth, upload], async (req, res, next) => {
  try {
    const response = await User.editPicture(req.user, req.file.filename)
    res.status(200).send(response)
  } catch (err) {
    next(err)
  }
})

export default userRouter
