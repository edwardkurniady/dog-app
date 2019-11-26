'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    nik: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    isWalker: DataTypes.BOOLEAN,
    dateOfBirth: DataTypes.DATEONLY,
    placeOfBirth: DataTypes.STRING,
    photo: DataTypes.BLOB,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Dog, { foreignKey: 'ownerId' });
    User.hasMany(models.Post, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.hasOne(models.Walker, { foreignKey: 'id' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
    User.hasMany(models.Transaction, { foreignKey: 'userId' });
  };
  return User;
};