'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      walkerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Walkers',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      status: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      totalPayment: {
        type: Sequelize.INTEGER
      },
      extraPrice: {
        type: Sequelize.INTEGER
      },
      basePrice: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};