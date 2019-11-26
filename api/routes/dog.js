const base = 'dog';
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'POST',
    path: `/${base}/register`,
    config: {
      handler : controller.register,
      validate: {
        payload: {
          name: Joi.string().required(),
          owner_id: Joi.number().required(),
          breed_id: Joi.number().required(),
          age: Joi.number().required(),
          gender: Joi.string().required(),
          weight: Joi.number().required(),
          photo: Joi.object(),
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