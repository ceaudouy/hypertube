import Sequelize, { Model } from 'sequelize'
import { User } from 'models'
import { db } from 'middlewares'

class Comment extends Model {}

Comment.init(
  {
    movie: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'comment' }
)

Comment.add = async (comment, user) => {
  const newComment = await Comment.create(comment)
  await user.addComment(newComment)
  return newComment
}

Comment.get = async movie => {
  const comments = await Comment.findAll({
    where: { movie },
    include: [{ model: User }],
  })
  return comments
}

export default Comment
