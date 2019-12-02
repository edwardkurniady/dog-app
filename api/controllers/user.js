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
  auth,
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
    const session = auth.verify(req.headers.session);
    if (session.error) return {
      ...constants['401'],
      message: session.error,
    };

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
    
    return {
      ...constants['200'],
      session: auth.refresh(session),
    };
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.get = async (req, h) => {
  try {
    const session = auth.verify(req.headers.session);
    if (session.error) return {
      ...constants['401'],
      message: session.error,
    };
  
    const usr = await user.get(req.params.user || session.user.id);
    return {
      profile: usr,
      dogs: await dog.getList(usr.id),
      session: auth.refresh(session),
    };
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
