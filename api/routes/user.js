const base = 'user';
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'POST',
    path: `/${base}/login`,
    config: {
      handler : controller.login,
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
      handler : controller.register,
      validate: {
        payload: {
          photo: Joi.object(),
          name: Joi.string().required(),
          gender: Joi.string().required(),
          address: Joi.string().required(),
          password: Joi.string().required(),
          phoneNumber: Joi.string().required(),
          placeOfBirth: Joi.string().required(),
          email: Joi.string().email().required(),
          nik: Joi.string().length(16).regex(/[0-9]+/),
          dateOfBirth: Joi.date().format('DD-MM-YYYY').required(),
        },
      },
    },
  },
];