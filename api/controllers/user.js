const path = require('path');
const Bounce = require('bounce');
const { user } = require('../services');
const constants = require(path.resolve('.', 'const'));

const {
  find,
  insert,
} = require('../services');
const {
  crypt,
  normalize,
} = require(path.resolve('.', 'utils'));

function processCredentials(payload) {
  payload.phoneNumber = normalize.phoneNumber(payload.phoneNumber);
  payload.password = crypt.encrypt(payload.password);
  return payload;
}

module.exports.login = async (req, h) => {
  try {
    const payload = processCredentials(req.payload);
    const loginResp = await user.login(payload);
    if (loginResp.error) return loginResp;
    return loginResp;
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.register = async (req, h) => {
  try {
    const payload = processCredentials(req.payload);
    return await user.register(payload);
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
