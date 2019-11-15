const base = 'breed';
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'GET',
    path: `/${base}`,
    config: {
      handler : controller.getList,
    },
  },
];