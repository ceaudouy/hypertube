import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

class View extends Model {}

View.init(
  {
    movie: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'view' }
)

View.add = async (movie, type, user) => {
  const view = await View.create({ movie, type })
  await user.addView(view)
  return view
}

export default View
