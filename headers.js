module.exports = {
  dotenv    : require('dotenv').config(),
  fs        : require('fs'),
  Glue      : require('glue'),
  Hapi      : require('hapi'),
  Joi       : require('joi').extend(require('joi-date-extensions')),
  path      : require('path'),
  Sequelize : require('sequelize'),
};
