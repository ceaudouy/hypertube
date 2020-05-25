import Sequelize, { Model } from 'sequelize';
import { db } from 'middlewares';

import User from './user';

class Favorite extends Model {};

Favorite.init({
  movie: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { sequelize: db, modelName: 'favorite' });

Favorite.add = async (movie, type, user) => {
  let favorite = undefined;

  if (await Favorite.findOne({ where: { movie, type, user } })) {
    favorite = await Favorite.destroy({ where: { movie, type } })
    user.addFavorite(favorite);
  } else {
    favorite = await Favorite.create({ movie, type });
  }
  
  return favorite;
}

Favorite.sync();

export default Favorite;