import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { handleError, passport, db } from 'middlewares'
import { fileCleaner } from 'services'
import { userRouter, movieRouter } from 'routes'

dotenv.config()

const app = express()

db.sync()

fileCleaner()

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   next()
// })

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(passport.initialize())

app.use('/user', userRouter)
app.use('/movie', movieRouter)

app.use(handleError)

app.listen(3300)
