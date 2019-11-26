'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Post;
};