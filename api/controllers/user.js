const path = require('path');
const Bounce = require('bounce');
const constants = require(path.resolve('.', 'const'));

const {
  find,
  insert,
} = require('../services');
const {
  crypt,
  normalize,
} = require(path.resolve('.', 'utils'));

module.exports.login = async (req, h) => {
  const payload = { ...req.payload };
  payload.phoneNumber = normalize.phoneNumber(payload.phoneNumber);
  payload.password = crypt.encrypt(payload.password);
  
  try {
    const errResp = {
      message: null,
      ...constants['401'],
    };
    const user = await find('User', payload, 'phoneNumber');

    if (!user) errResp.message = 'Phone number not registered!';
    if (user && user.password != payload.password) errResp.message = 'Wrong password!';
    if (errResp.message) return errResp;

    return {
      ...constants['200'],
      cookie: '',
    };
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.register = async (req, h) => {
  const payload = { ...req.payload };
  payload.phoneNumber = normalize.phoneNumber(payload.phoneNumber);
  payload.password = crypt.encrypt(payload.password);

  try {
    const dupsCheck = ['phoneNumber', 'email'];
    for (let i = 0; i < dupsCheck.length; i++) {
      if (!(await find('User', payload, dupsCheck[i]))) continue;
      return {
        ...constants['409'],
        message: `duplicate ${dupsCheck[i]}`,
      }
    }
  
    payload.isWalker = false;
    await insert('User', payload);
    
    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
