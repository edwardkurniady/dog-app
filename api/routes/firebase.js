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
          title: Joi.string().required(),
          body: Joi.string().required(),
          From: Joi.string().required(),
          description: Joi.string().required(),
          id: Joi.number().required(),
        },
      },
    },
  },
];