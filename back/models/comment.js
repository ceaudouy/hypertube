import Sequelize, { Model } from 'sequelize';
import { db } from 'middlewares';

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

Comment.add = async (comment, user) => {
  const newComment = await Comment.create(comment);
  await user.addComment(newComment);
  return newComment;
}

Comment.get = async (type, movie) => {
  const comments = await Comment.findAll({where: {type, movie}});
  return comments;
}

export default Comment;