//requirements
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal(
              '(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)'
            ),
            'vote_count',
          ],
        ],
      });
    });
  }
}

//create fields/cols for Post model
Post.init(
  {
    //id col
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //title col
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //url col
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    //user id col
    user_id: {
      type: DataTypes.INTEGER,
      //foreign key
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  //2nd POST model obj
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
