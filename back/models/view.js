import Sequelize, { Model } from 'sequelize';
import { db } from 'middlewares';

class View extends Model {};

View.init({
  movie: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { sequelize: db, modelName: 'view' });

View.add = async (movie, type) => {
  const view = View.create({ movie, type });
  return view;
}

export default View;