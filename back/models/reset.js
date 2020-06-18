import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

import User from './user'

class Reset extends Model {}

Reset.init(
  {
    token: {
      type: Sequelize.STRING,
      defaultValue: Math.random().toString(36).substr(2),
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email',
        },
      },
    },
  },
  { sequelize: db, modelName: 'reset' }
)

Reset.request = async email => {
  const user = await User.findOne({ where: { email } })
  if (user) {
    const reset = await Reset.create({ email })
    user.setReset(reset)
    return reset
  }
}

Reset.verify = async (token, password) => {
  const reset = await Reset.findOne({
    where: { token },
    include: [{ model: User }],
  })
  if (reset) {
    await reset.user.update({ password })
    await reset.destroy()
  }
}

export default Reset
