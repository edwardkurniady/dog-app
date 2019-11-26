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
  };
  return User;
};