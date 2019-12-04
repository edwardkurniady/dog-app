const base = 'dog';
const { Readable } = require('stream');
const controller = require('../controllers')[base];
const Joi = require('joi').extend(require('joi-date-extensions'));

module.exports = [
  {
    method: 'GET',
    path: `/${base}/get/{user?}`,
    config: {
      handler : controller.get,
    },
  },
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
          name: Joi.string().required(),
          breedId: Joi.number().required(),
          age: Joi.number().required(),
          gender: Joi.string().required(),
          weight: Joi.number().required(),
          photo: Joi.object().type(Readable),
          specialNeeds: Joi.string(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/update`,
    config: {
      handler: controller.update,
      payload: {
        parse: true,
        output: 'stream',
        maxBytes: 5 * 1000 * 1000,
        allow: 'multipart/form-data',
      },
      validate: {
        payload: {
          id: Joi.number(),
          name: Joi.string(),
          deletePhoto: Joi.boolean(),
          breedId: Joi.number(),
          age: Joi.number(),
          gender: Joi.string(),
          weight: Joi.number(),
          photo: Joi.object().type(Readable),
          specialNeeds: Joi.string(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/delete`,
    config: {
      handler: controller.delete,
      validate: {
        payload: {
          id: Joi.number().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: `/${base}/find/{dog}`,
    config: {
      handler: controller.find,
    },
  },
];