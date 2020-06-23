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
  const views = await user.getViews()
  if (!views.find(el => el.movie === movie)) {
    const view = await View.create({ movie })
    await user.addView(view)
  }
}

export default View
