//requirements
const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");

//create associations of one-to-many rel
User.hasMany(Post, {
  foreignKey: "user_id",
});

//reverse association
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//create associations of many-to-many rel
User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

//reverse association
Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Vote };
