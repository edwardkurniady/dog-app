const path = require('path');
const Bounce = require('bounce');
const constants = require(path.resolve('.', 'const'));

const {
  get,
  insert,
} = require('../services');

module.exports.register = async (req, h) => {
  try {
    await insert('Dog', req.payload);
    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.get = async (req, h) => {
  try {
    const data = { owner_id: req.params.user };
    const options = {
      ...req.query,
    };
    return await get('Dog', data, 'owner_id', options);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
