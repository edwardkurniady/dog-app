const path = require('path');
const Bounce = require('bounce');

const {
  get,
} = require('../services');

module.exports.getList = async (req, h) => {
  try {
    return await get('Breed');
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
