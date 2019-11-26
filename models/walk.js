'use strict';
module.exports = (sequelize, DataTypes) => {
  const Walk = sequelize.define('Walk', {
    transactionId: DataTypes.INTEGER,
    beforePhoto: DataTypes.BLOB,
    afterPhoto: DataTypes.BLOB,
    poopPhoto: DataTypes.BLOB,
    breaksQuantity: DataTypes.INTEGER,
    breaksDurationTotal: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {});
  Walk.associate = function(models) {
    // associations can be defined here
    Walk.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
  };
  return Walk;
};