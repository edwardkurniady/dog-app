'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    walkerId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    rating: DataTypes.DOUBLE
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Walker, { foreignKey: 'walkerId' });
  };
  return Review;
};