import Sequelize, { Model } from 'sequelize';
import { db } from 'middlewares';

import User from './user';

class Comment extends Model {};

Comment.init({
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  movie: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { sequelize: db, modelName: 'comment' });

Comment.hasOne(User)

Comment.add = async (comment, user) => {
  const newComment = await Comment.create(comment);
  await newComment.addUser(user);
  return newComment;
}

Comment.get = async (type, movie) => {
  const comments = await Comment.findAll({where: {type, movie}});
  return comments;
}

Comment.sync();

export default Comment;