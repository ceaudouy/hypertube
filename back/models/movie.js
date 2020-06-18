import Sequelize, { Model } from 'sequelize'
import { db } from 'middlewares'

class Movie extends Model {}

Movie.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    se: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    le: {
      type: Sequelize.INTEGER,
    },
    url: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
    provider: {
      type: Sequelize.STRING,
    },
    magnet: {
      type: Sequelize.STRING(1250),
      allowNull: false,
    },
    file: {
      type: Sequelize.STRING,
    },
    imdbid: {
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

Movie.get = async id => {
  return Movie.findOne({ where: { id } })
}

Movie.addFile = async (magnet, file) => {
  await Movie.update({ file }, { where: { magnet } })
}

export default Movie
