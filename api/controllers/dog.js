const path = require('path');
const Bounce = require('bounce');
const { dog } = require('../services');
const constants = require(path.resolve('.', 'const'));

module.exports.register = async (req, h) => {
  try {
    await dog.register(req.payload);
    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.get = async (req, h) => {
  try {
    return dog.getList(req.params.user, req.query);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
