import Sequelize, { Model, Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db, ErrorHandler } from 'middlewares';


class User extends Model {};

User.init({
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-z]+$/i
    }
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
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
    allowNull: false
  },
  token: {
    type: Sequelize.STRING 
  }
}, { sequelize: db, modelName: 'user' });

User.beforeCreate((user) => {
  return bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
  })
  .catch(err => {
    throw new Error(err)
  })
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
  const signingUser = await User.findOne({where: {email: user.email}});
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

User.sync();

export default User;