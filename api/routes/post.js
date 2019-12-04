const base = 'post';
const Joi = require('joi').extend(require('joi-date-extensions'));
const controller = require('../controllers')[base];

module.exports = [
  {
    method: 'POST',
    path: `/${base}/upload`,
    config: {
      handler : controller.upload,
      validate: {
        payload: {
          title: Joi.string().required(),
          content: Joi.string().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/update`,
    config: {
      handler : controller.update,
      validate: {
        payload: {
          id: Joi.number().required(),
          title: Joi.string(),
          content: Joi.string(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/delete`,
    config: {
      handler : controller.delete,
      validate: {
        payload: {
          id: Joi.number().required(),
        },
      },
    },
  },
  {
    method: 'POST',
    path: `/${base}/like`,
    config: {
      handler : controller.like,
      validate: {
        payload: {
          id: Joi.number().required(),
        },
      },
    },
  },
  {
    method: 'GET',
    path: `/${base}/get/{user?}`,
    config: {
      handler : controller.get,
    },
  },
  {
    method: 'GET',
    path: `/${base}/find/{post}`,
    config: {
      handler : controller.find,
    },
  },
];