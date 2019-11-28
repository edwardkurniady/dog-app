const base = 'dog';
const { Readable } = require('stream');
const controller = require('../controllers')[base];
const Joi = require('joi').extend(require('joi-date-extensions'));

module.exports = [
  {
    method: 'POST',
    path: `/${base}/register`,
    config: {
      handler: controller.register,
      payload: {
        parse: true,
        output: 'stream',
        maxBytes: 5 * 1000 * 1000,
        allow: 'multipart/form-data',
      },
      validate: {
        payload: {
          // name: Joi.string().required(),
          // owner_id: Joi.number().required(),
          // breed_id: Joi.number().required(),
          // age: Joi.number().required(),
          // gender: Joi.string().required(),
          // weight: Joi.number().required(),
          photo: Joi.object().type(Readable),
          // photo: Joi.any(),
          special_needs: Joi.string(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: `/${base}/get/{user}`,
    config: {
      handler : controller.get,
    },
  },
];