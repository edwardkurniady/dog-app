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
          content: Joi.string().required(),
          title: Joi.string().required(),
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
          content: Joi.string().allow(''),
          title: Joi.string().allow(''),
          id: Joi.number().required(),
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
  {
    method: 'GET',
    path: `/${base}/global`,
    config: {
      handler : controller.global,
    },
  },
];