const path = require('path');
const Bounce = require('bounce');
const { dog } = require('../services');

module.exports.register = async (req, h) => {
  try {
    return await dog.register(req.payload);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.get = async (req, h) => {
  try {
    return await dog.getList(req.params.user, req.query);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
