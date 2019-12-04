const base = 'walker';
const { Readable } = require('stream');
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'POST',
    path: `/${base}/register`,
    config: {
      handler: controller.register,
      validate: {
        payload: {
          description: Joi.string().required(),
          travelDistance: Joi.number().required(),
          walkDuration: Joi.number().required(),
          maxDogSize: Joi.number().required(),
          pricing: Joi.number().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/update`,
    config: {
      handler: controller.update,
      validate: {
        payload: {
          isVerified: Joi.boolean(),
          isRecommended: Joi.boolean(),
          description: Joi.string(),
          travelDistance: Joi.number(),
          walkDuration: Joi.number(),
          maxDogSize: Joi.number(),
          pricing: Joi.number(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/rate`,
    config: {
      handler: controller.rate,
      validate: {
        payload: {
          id: Joi.number(),
          rate: Joi.number(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: `/${base}/{walker?}`,
    config: {
      handler: controller.get
    },
  },
];