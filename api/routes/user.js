const base = 'user';
const { Readable } = require('stream');
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'POST',
    path: `/${base}/login`,
    config: {
      handler: controller.login,
      validate: {
        payload: {
          password: Joi.string().required(),
          phoneNumber: Joi.string().required(),
        },
      },
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
          phoneNumber: Joi.string().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
          gender: Joi.string().required(),
          address: Joi.string().required(),
          email: Joi.string().email().required(),
          placeOfBirth: Joi.string().required(),
          dateOfBirth: Joi.date().format('DD-MM-YYYY').required(),
          nik: Joi.string().regex(/[0-9]{16}/),
          photo: Joi.object().type(Readable),
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
          phoneNumber: Joi.string(),
          password: Joi.string(),
          name: Joi.string(),
          gender: Joi.string(),
          address: Joi.string(),
          email: Joi.string().email(),
          placeOfBirth: Joi.string(),
          dateOfBirth: Joi.date().format('DD-MM-YYYY'),
          nik: Joi.string().regex(/[0-9]{16}/),
          photo: Joi.object().type(Readable),
        },
      },
    },
  },
  {
    method: 'GET',
    path: `/${base}/get/{user?}`,
    config: {
      handler: controller.get
    },
  },
];