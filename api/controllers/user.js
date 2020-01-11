const path = require('path');
const root = path.resolve('.');
const jwt = require('jsonwebtoken');
const constants = require(`${root}/const`);
const {
  database,
  photo,
} = require('../services');
const {
  filter,
  processCred,
} = require(`${root}/utils`);

const getDetails = async (id) => {
  return {
    ...constants['200'],
    body: await database.findOne('User', { id }, {
      attributes: {
        exclude:[
          'latlng',
          'createdAt',
          'updatedAt',
        ],
      },
    }),
  };
};

module.exports.login = async (req, _) => {
  const payload = processCred(req.payload);
  const errResp = {
    message: null,
    ...constants['401'],
  };
  const options = {
    attributes: {
      exclude:[
        'createdAt',
        'updatedAt',
      ],
    },
  };

  const where = { phoneNumber: payload.phoneNumber };
  const usr = await database.findOne('User', where, options);

  errResp.message = !usr ?
    'Phone number not registered!' : 
    usr.password != payload.password ?
      'Wrong password!' :
      null;

  if (errResp.message) return errResp;

  if (payload.token) await database.update('User', {
    token: payload.token,
  }, where);

  return {
    ...constants['200'],
    session: jwt.sign({
      userId: usr.id,
    }, process.env.JWT_KEY),
    body: usr,
  };
};

module.exports.register = async (req, _) => {
  const payload = processCred(req.payload);
  const {
    key,
    duplicate,
  } = await database.dupCheck('User', payload);

  if (duplicate) return {
    ...constants['409'],
    message: `duplicate ${key}!`,
  };
  
  payload.photo = await photo.upload(
    payload.photo,
    payload.phoneNumber,
    'user/profile'
  );
  filter(payload);

  payload.isWalker = false;
  payload.type = 'customer';

  await database.create('User', payload);
  
  return {
    ...constants['200'],
    body: null,
  };
};

module.exports.update = async (req, _) => {
  const payload = processCred(req.payload);
  payload.id = req.requester;
  const user = await database.findOne('User', { id: payload.id });
  const {
    key,
    duplicate,
  } = await database.dupCheck('User', payload);
  const isUserData = duplicate ? (duplicate.id === payload.id) : false;

  if (duplicate && !isUserData) return {
    ...constants['409'],
    message: `duplicate ${key}!`,
  };

  payload.photo = await photo.upload(
    payload.photo,
    user.phoneNumber,
    'user/profile',
  );
  filter(payload);
  const movePhoto = user.photo && (payload.phoneNumber !== user.phoneNumber);
  if (movePhoto) payload.photo = await photo.update(
    'user/profile',
    user.phoneNumber,
    payload.phoneNumber,
  );
  
  await database.update('User', payload, { id: payload.id });
  
  return getDetails(payload.id);
};

module.exports.get = async (req, _) => {
  return getDetails(req.params.user || req.requester);
};

module.exports.delete = async (req, _) => {
  const where = { id: req.requester };
  const u = await database.findOne('User', where);
  await photo.delete(u.phoneNumber, 'user/profile');
  await database.update('User', { photo: null }, where);
  return getDetails(u.id);
};
