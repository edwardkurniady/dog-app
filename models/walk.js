'use strict';
module.exports = (sequelize, DataTypes) => {
  const Walk = sequelize.define('Walk', {
    transactionId: DataTypes.INTEGER,
    distance: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    beforePhoto: DataTypes.STRING,
    afterPhoto: DataTypes.STRING,
    poopPhoto: DataTypes.STRING,
    breaks: DataTypes.INTEGER,
    breaksDuration: DataTypes.INTEGER
  }, {});
  Walk.associate = function(models) {
    // associations can be defined here
    Walk.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
  };
  return Walk;
};