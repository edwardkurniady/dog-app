'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    breedId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    photo: DataTypes.BLOB,
    specialNeeds: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
    Dog.belongsTo(models.User, { foreignKey: 'ownerId' });
    Dog.belongsTo(models.Breed, { foreignKey: 'breedId' });
  };
  return Dog;
};