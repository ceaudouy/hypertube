import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { db, ErrorHandler } from 'middlewares'

import Favorite from './favorite'
import View from './view'
import Comment from './comment'
import Reset from './reset'

class User extends Model {}

User.init(
  {
    githubId: {
      type: Sequelize.INTEGER,
    },
    fortytwoId: {
      type: Sequelize.INTEGER,
    },
    firstname: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'firstname should only contain letters',
        },
      },
    },
    lastname: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'lastname should only contain letters',
        },
      },
    },
    login: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Login already exist',
      },
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already used',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Provided email not valid',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        is: {
          args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
          msg: 'Please provide a strong password',
        },
      },
    },
    token: {
      type: Sequelize.STRING,
    },
    picture: {
      type: Sequelize.STRING,
      defaultValue: 'images/one.jpg',
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password', 'token'] },
    },
    scopes: {
      complete: {
        attributes: {},
      },
    },
    sequelize: db,
    modelName: 'user',
  }
)

User.hasMany(Favorite)
User.hasMany(View)
User.hasMany(Comment)
User.hasOne(Reset)

Favorite.belongsTo(User)
View.belongsTo(User)
Comment.belongsTo(User)
Reset.belongsTo(User)

User.beforeCreate(async user => {
  if (user.password) {
    return await bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash
      })
      .catch(err => {
        throw new Error(err)
      })
  }
})

User.beforeUpdate(async user => {
  if (user.password) {
    return await bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash
      })
      .catch(err => {
        throw new Error(err)
      })
  }
})

User.register = async user => {
  const newUser = await User.create(user)
  return newUser
}

User.signIn = async user => {
  const signingUser = await User.scope('complete').findOne({
    where: { email: user.email },
  })
  if (!signingUser) throw new ErrorHandler(403, 'user not found')

  if (await bcrypt.compare(user.password, signingUser.password)) {
    if (!signingUser.token) {
      const token = jwt.sign({ id: signingUser.id }, process.env.JWT_SECRET)
      await User.update({ token: token }, { where: { id: signingUser.id } })
      return token
    } else return signingUser.token
  } else throw new ErrorHandler(403, 'Invalide Email or Password')
}

User.signOut = async user => {
  User.update({ token: null }, { where: { id: user.id } })
}

User.favorites = async user => await user.getFavorites()

User.views = async user => await user.getViews()

User.edit = async (user, infos) => {
  await User.update(infos, { where: { id: user.id } })
  return await User.findOne({ where: { id: user.id } })
}

User.editPicture = async (user, picture) => {
  await User.update(
    { picture: `images/${picture}` },
    { where: { id: user.id } }
  )
  return await User.findOne({ where: { id: user.id } })
}

export default User
