const path = require('path');
const root = path.resolve('.');
const constants = require(`${root}/const`);
const { dog } = require('../services');

module.exports.register = async (req, h, session) => {
  req.payload.ownerId = session.user.id
  await dog.register(req.payload);
  return {
    ...constants['200'],
    dogs: await dog.getList(req.payload.ownerId),
  };
};

module.exports.get = async (req, h, session) => {
  const user = req.params.user || session.user.id;
  return dog.getList(user, req.query);
};

module.exports.update = async (req, h) => {
  await dog.update(req.payload);
  
  return {
    ...constants['200'],
    dog: await dog.find(req.payload.id),
  };
};

module.exports.find = async (req, h) => {
  return dog.find(req.params.dog);
};

module.exports.delete = async (req, h, session) => {
  const doggo = await dog.find(req.payload.id);
  if (doggo.ownerId !== session.user.id) return {
    ...constants['403'],
    message: 'Permission denied!',
  };

  await dog.delete(req.payload.id);
  return constants['200'];
};
