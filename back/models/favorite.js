import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

class Favorite extends Model {}

Favorite.init(
  {
    movie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'favorite' }
)

Favorite.add = async (movie, user) => {
  if (await Favorite.findOne({ where: { movie, userId: user.id } })) {
    await Favorite.destroy({ where: { movie } })
  } else {
    const favorite = await Favorite.create({ movie })
    await user.addFavorite(favorite)
  }
}

export default Favorite
