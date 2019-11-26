'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    breed_id: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    photo: DataTypes.BLOB,
    special_needs: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
    Dog.belongsTo(models.User, { foreignKey: 'owner_id' });
    Dog.belongsTo(models.Breed, { foreignKey: 'breed_id' });
  };
  return Dog;
};