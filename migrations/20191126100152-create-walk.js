'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Walks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transactionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transactions',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      distance: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      beforePhoto: {
        type: Sequelize.STRING
      },
      afterPhoto: {
        type: Sequelize.STRING
      },
      poopPhoto: {
        type: Sequelize.STRING
      },
      breaks: {
        type: Sequelize.INTEGER
      },
      breaksDuration: {
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
    return queryInterface.dropTable('Walks');
  }
};