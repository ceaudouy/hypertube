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
  },
  { sequelize: db, modelName: 'movie' }
)

export default Movie
