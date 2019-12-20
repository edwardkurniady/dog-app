'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    walkerId: DataTypes.INTEGER
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
    Schedule.belongsTo(models.Walker, { foreignKey: 'walkerId' });
  };
  return Schedule;
};