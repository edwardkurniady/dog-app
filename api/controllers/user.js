const path = require('path');
const root = path.resolve('.');
const Bounce = require('bounce');
const jwt = require('jsonwebtoken');
const constants = require(`${root}/const`);
const {
  dog,
  user,
} = require('../services');
const {
  dupCheck,
  processCred,
} = require(`${root}/utils`);

module.exports.login = async (req, h) => {
  try {
    const payload = processCred(req.payload);
    const errResp = {
      message: null,
      ...constants['401'],
    };

    const usr = await user.login(payload);
    if (!usr) errResp.message = 'Phone number not registered!';
    if (usr && usr.password != creds.password) errResp.message = 'Wrong password!';
    if (errResp.message) return errResp;

    return {
      ...usr,
      ...constants['200'],
      dogs: await dog.getList(user.id),
      session: jwt.sign({
        id: user.id
      }, process.env.JWT_KEY),
    };
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.register = async (req, h) => {
  try {
    const payload = processCred(req.payload);
    const {
      key,
      duplicate,
    } = await dupCheck('User', payload);

    if (duplicate) return {
      ...constants['409'],
      message: `duplicate ${key}!`,
    };
    await user.register(payload);
    
    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.update = async (req, h) => {
  try {
    const payload = processCredentials(req.payload);
    const {
      key,
      duplicate,
    } = await dupCheck('User', payload);
    const isUserData = duplicate ? duplicate.id === payload.id : false;
  
    if (duplicate && !isUserData) return {
      ...constants['409'],
      message: `duplicate ${key}!`,
    };
    await user.update(payload);
    
    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
