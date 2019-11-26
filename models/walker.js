'use strict';
module.exports = (sequelize, DataTypes) => {
  const Walker = sequelize.define('Walker', {
    isVerified: DataTypes.BOOLEAN,
    isRecommended: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    travelDistance: DataTypes.INTEGER,
    walkDuration: DataTypes.INTEGER,
    maxDogSize: DataTypes.INTEGER,
    pricing: DataTypes.INTEGER
  }, {});
  Walker.associate = function(models) {
    // associations can be defined here
    Walker.hasOne(models.User, { foreignKey: 'id' });
    Walker.hasMany(models.Review, { foreignKey: 'walkerId' });
    Walker.hasMany(models.Transaction, { foreignKey: 'walkerId' });
  };
  return Walker;
};