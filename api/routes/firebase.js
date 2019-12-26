const base = 'firebase';
const controller = require('../controllers')[base];
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: `/${base}/notification`,
    config: {
      handler: controller.notification,
      validate: {
        payload: {
          userId: Joi.number().required(),
          title: Joi.string().required(),
          body: Joi.string().required(),
        },
      },
    },
  },
];