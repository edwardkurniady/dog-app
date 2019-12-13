const base = 'transaction';
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'POST',
    path: `/${base}/findawalker`,
    config: {
      handler : controller.findAWalker,
      validate: {
        payload: {
          paymentMethod: Joi.string(),
          walkDate: Joi.date().required(),
          duration: Joi.number().required(),
          dogs: Joi.array().items(Joi.number()).required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/create`,
    config: {
      handler : controller.create,
      validate: {
        payload: {
          paymentMethod: Joi.string(),
          walkDate: Joi.date().required(),
          walkerId: Joi.number().required(),
          duration: Joi.number().required(),
          dogs: Joi.array().items(Joi.number()).required(),
        },
      },
    },
  },
];