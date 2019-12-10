'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: DataTypes.INTEGER,
    walkerId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    totalPayment: DataTypes.INTEGER,
    extraPrice: DataTypes.INTEGER,
    basePrice: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, { foreignKey: 'userId' });
    Transaction.belongsTo(models.Walker, { foreignKey: 'walkerId' });
    Transaction.hasMany(models.TransactionDetail, { foreignKey: 'transactionId' });
    Transaction.hasOne(models.Walk, { foreignKey: 'transactionId' });
  };
  return Transaction;
};