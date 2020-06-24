import passport from 'passport'
import axios from 'axios'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { ErrorHandler } from 'middlewares'
import { User } from 'models'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(opts, async (jwt, done) => {
    try {
      const user = await User.findOne({ where: { id: jwt.id } })
      if (user) return done(null, user)
      else return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  })
)

export const fortytwo = async (req, res, next) => {
  try {
    const { code } = req.query
    const response = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.FORTYTWO_ID,
      client_secret: process.env.FORTYTWO_SECRET,
      code: code,
      redirect_uri: 'http://matchapi.guillaumerx.fr:3300/user/fortytwo',
    })
    const token = response.data.access_token

    const { data } = await axios('https://api.intra.42.fr/v2/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!data) throw new ErrorHandler(400, 'Unknown user')
    let user = await User.scope('complete').findOrCreate({
      where: { fortytwoId: data.id },
      defaults: {
        login: data.login,
        email: data.email,
      },
    })
    if (!user.token) {
      console.log(user.id)
      await User.update(
        {
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
        },
        { where: { fortytwoId: data.id } }
      )
      user = await User.scope('complete').findOne({
        where: { fortytwoId: data.id },
      })
      console.log(user)
    }
    res.redirect(`http://localhost:3000/signin/${user.token}`)
  } catch (err) {
    next(err)
  }
}

export const github = async (req, res, next) => {
  try {
    const { code } = req.query
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code,
      }
    )
    const token = response.data.split('&')[0].split('=')[1]

    const { data } = await axios('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!data) throw new ErrorHandler(400, 'Unknown user')
    let user = await User.scope('complete').findOrCreate({
      where: { fortytwoId: data.id },
      defaults: {
        login: data.login,
        email: data.email,
      },
    })
    if (!user.token) {
      console.log(user.id)
      await User.update(
        {
          token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
        },
        { where: { fortytwoId: data.id } }
      )
      user = await User.scope('complete').findOne({
        where: { fortytwoId: data.id },
      })
    }
    res.redirect(`http://localhost:3000/signin/${user.token}`)
  } catch (err) {
    next(err)
  }
}

export const auth = passport.authenticate('jwt', { session: false })

export default passport
