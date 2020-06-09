import { Router } from 'express'

import { Comment, Favorite, User, View } from 'models'
import { auth } from 'middlewares'

const movieRouter = Router()

movieRouter.post('/comment', auth, async (req, res, next) => {
  try {
    const response = await Comment.add(req.body, req.user)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

movieRouter.get('/comment', async (req, res, next) => {
  try {
    const { type, movie } = req.body
    const response = await Comment.get(type, movie)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

movieRouter.get('/favorites', auth, async (req, res, next) => {
  try {
    const response = await User.favorites(req.user)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

movieRouter.post('/favorites', auth, async (req, res, next) => {
  try {
    const { movie, type } = req.body
    const response = Favorite.add(movie, type, req.user)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

movieRouter.get('/views', auth, async (req, res, next) => {
  try {
    const response = await User.views(req.user)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
})

movieRouter.post('/view', auth, async (req, res, next) => {
  try {
    const { movie, type } = req.body
    const view = await View.add(movie, type, req.user)
    res.status(200).json(view)
  } catch (err) {
    next(err)
  }
})

export default movieRouter
