const path = require('path');
const root = path.resolve('.');
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
  const payload = processCred(req.payload);
  const errResp = {
    message: null,
    ...constants['401'],
  };

  const usr = await user.login(payload);
  if (!usr) errResp.message = 'Phone number not registered!';
  if (usr && usr.password != payload.password) errResp.message = 'Wrong password!';
  if (errResp.message) return errResp;

  return {
    ...constants['200'],
    commonResponse: {
      ...usr,
      dogs: await dog.getList(usr.id),
    },
    session: jwt.sign({
      user: {
        id: usr.id,
      },
    }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRATION }),
  };
};

module.exports.register = async (req, h) => {
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
};

module.exports.update = async (req, h, session) => {
  const payload = processCred(req.payload);
  payload.id = session.user.id;
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
};

module.exports.get = async (req, h, session) => {
  const usr = await user.get(req.params.user || session.user.id);
  return {
    profile: usr,
    dogs: await dog.getList(usr.id),
  };
};
