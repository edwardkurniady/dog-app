const path = require('path');
const root = path.resolve('.');
const jwt = require('jsonwebtoken');
const constants = require(`${root}/const`);
const {
  dog,
  user,
  post,
  comment,
  walker,
} = require('../services');
const {
  dupCheck,
  processCred,
} = require(`${root}/utils`);

const getDetails = async (userId, profile, searcher) => {
  return {
    profile: profile ? profile : await user.get(userId),
    walkerInfo: await walker.get(userId),
    dogs: await dog.getList({ ownerId: userId }),
    posts: await post.get(userId, searcher),
    comments: await comment.get(userId, searcher),
  };
};

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

  delete usr.password;
  [
    'password',
    'createdAt',
    'updatedAt',
  ].forEach(key => delete usr[key]);

  return {
    ...constants['200'],
    body: await getDetails(usr.id, usr),
    session: jwt.sign({
      user: { id: usr.id },
    }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    }),
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
  
  return {
    ...constants['200'],
    body: await getDetails(payload.id),
  };
};

module.exports.get = async (req, h, session) => {
  const userId = req.params.user || session.user.id;
  
  const usr = await user.get(userId);
  return getDetails(userId, usr, session.user.id);
};
