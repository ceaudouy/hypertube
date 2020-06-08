import Sequelize, { Model } from 'sequelize';
import { db } from 'middlewares';

class Movie extends Model {};

Movie.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  seeds: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  peers: {
    type: Sequelize.INTEGER
  },
  size: {
    type: Sequelize.STRING
  },
  provider: {
    type: Sequelize.STRING
  },
  link: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  magnet: {
    type: Sequelize.STRING(1250)
  }
}, {sequelize: db, modelName: 'movie'});

export default Movie;