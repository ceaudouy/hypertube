import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

class Movie extends Model {}

Movie.init(
  {
    magnet: {
      type: Sequelize.STRING(1250),
      allowNull: false,
    },
    file: {
      type: Sequelize.STRING,
    },
  },
  {
    scopes: {
      front: {
        attributes: { exclude: ['magnet', 'file'] },
      },
    },
    sequelize: db,
    modelName: 'movie',
  }
)

Movie.get = async magnet => {
  return Movie.findOne({ where: { magnet } })
}

Movie.addFile = async (magnet, file) => {
  await Movie.create({ magnet, file })
}

export default Movie
