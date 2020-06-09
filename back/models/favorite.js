import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

class Favorite extends Model {}

Favorite.init(
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
  { sequelize: db, modelName: 'favorite' }
)

Favorite.add = async (movie, type, user) => {
  let favorite = undefined

  if (await Favorite.findOne({ where: { movie, type, userId: user.id } })) {
    favorite = await Favorite.destroy({ where: { movie, type } })
  } else {
    favorite = await Favorite.create({ movie, type })
    await user.addFavorite(favorite)
  }

  return favorite
}

export default Favorite
