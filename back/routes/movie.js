import axios from 'axios'
import { Router } from 'express'

import { Comment, Favorite, User, View } from 'models'
import { auth } from 'middlewares'
import { stream } from 'services'

const movieRouter = Router()

movieRouter.get('/popcorn/:id', auth, async (req, res, next) => {
  try {
    const { data } = await axios(
      `https://tv-v2.api-fetch.sh/movie/${req.params.id}`
    )
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

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
    const { movie } = req.query
    const response = await Comment.get(movie)
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
    const { movie } = req.body
    const response = Favorite.add(movie, req.user)
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
    const { movie } = req.body
    const view = await View.add(movie, req.user)
    res.status(200).json(view)
  } catch (err) {
    next(err)
  }
})

movieRouter.get('/video', stream)

export default movieRouter
