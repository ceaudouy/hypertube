import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

class View extends Model {}

View.init(
  {
    movie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'view' }
)

View.add = async (movie, user) => {
  const view = await View.create({ movie })
  await user.addView(view)
  return view
}

export default View
