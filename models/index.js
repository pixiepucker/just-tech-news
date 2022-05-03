//requirements
const User = require('./User');
const Post = require('./Post');

//create associations of one-to-many rel
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//reverse association
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };