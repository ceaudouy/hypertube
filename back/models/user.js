import Sequelize, { Model, Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db, ErrorHandler } from 'middlewares';

import Favorite from './favorite';
import View from './view';
import Comment from './comment';

class User extends Model {};

User.init({
  githubId: {
    type: Sequelize.INTEGER
	},
	fortytwoId: {
		type: Sequelize.INTEGER
	},
  firstname: {
    type: Sequelize.STRING,
    validate: {
      is: /^[a-z]+$/i
    }
  },
  lastname: {
    type: Sequelize.STRING,
    validate: {
      is: /^[a-z]+$/i
    }
  },
  login: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
	},
	pathImage: {
		type: Sequelize.STRING,
		defaultValue: '../images/one.jpg',
	}
}, {
  defaultScope: {
    attributes: { exclude: ['password', 'token'] }
  },
  scopes: {
  complete: {
    attributes: {}
  }
  },
  sequelize: db,
  modelName: 'user' 
});

User.hasMany(Favorite);
User.hasMany(View);
User.hasMany(Comment);

Favorite.belongsTo(User);
View.belongsTo(User);
Comment.belongsTo(User);

User.beforeCreate( async (user) => {
  if (user.password) {
    return await bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash
    })
    .catch(err => {
      throw new Error(err)
    })
  }
});

User.register = async (user) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email: user.email },
        { login: user.login }
      ]
    }
  })
  if (existingUser) throw new ErrorHandler(403, 'User exists');

  const newUser = await User.create(user);
  return newUser;
}

User.signIn = async (user) => {
  const signingUser = await User.scope('complete').findOne({where: {email: user.email}});
  if (!signingUser) throw new ErrorHandler(403, 'user not found');

  if (await bcrypt.compare(user.password, signingUser.password)) {
    if (!signingUser.token) {
      const token = jwt.sign({ id: signingUser.id }, process.env.JWT_SECRET);
      await User.update({ token: token }, { where: { id: signingUser.id } })
      return token;
    }
    else
      return signingUser.token;
  }
}

User.signOut = async (user) => {
  User.update({ token: null }, {where: { id: user.id }})
}

User.favorites = async (user) => {
  const favorites = await user.getFavorites();
  return favorites;
}

User.views = async (user) => {
  const views = await user.getViews();
  return views;
}

User.edit = async (user) => {
	const editUser = await User.scope('complete').findOne({where: {id: user.id}})
	if (user.firstname != editUser.firstname)
		return await User.update({ firstname: user.firstname }, { where: { id: user.id }})
	if (user.lastname != editUser.lastname)
		return await User.update({ lastname: user.lastname }, { where: { id: user.id }})
	if (user.login != editUser.login)
		return await User.update({ login: user.login }, { where: { id: user.id }})
	if (user.email != editUser.email)
		return await User.update({ email: user.email }, { where: { id: user.id }})
	if (user.pathImage != editUser.pathImage)
		return await User.update({ pathImage: user.pathImage }, { where: { id: user.id }})
	if (user.password) {
		const newPassword = await bcrypt.hash(user.password, 10)
		if (newPassword != editUser.password)
			return await User.update({ password: newPassword }, { where: { id: user.id }})
	}
}

export default User;
