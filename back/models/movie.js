import Sequelize, { Model, Op } from 'sequelize'
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
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  { sequelize: db, modelName: 'movie' }
)

Movie.get = async magnet => {
  return Movie.findOne({ where: { magnet } })
}

Movie.addFile = async (magnet, file) => {
  await Movie.create({ magnet, file })
}

Movie.addView = async file => {
  const actual = await Movie.findOne({ where: { file } })
  await actual.update({ views: this.views++ })
}

Movie.cleanup = async () => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  await Movie.destroy({ where: { updatedAt: { [Op.lte]: d } } })
}

export default Movie
