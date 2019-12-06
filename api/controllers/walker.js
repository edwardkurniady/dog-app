const path = require('path');
const root = path.resolve('.');
const constants = require(`${root}/const`);
const {
  user,
  walker,
} = require('../services');

module.exports.register = async (req, h, session) => {
  req.payload.id = session.user.id;
  req.payload.isRecommended = false;
  req.payload.isVerified = false;
  req.payload.rating = 0;
  req.payload.raters = 0;

  await walker.register(req.payload);
  await user.update({
    id: req.payload.id,
    isWalker: true,
  });

  return {
    ...constants['200'],
    profile: await user.get(req.payload.id),
    walkerInfo: await walker.get(req.payload.id),
  };
};

module.exports.update = async (req, h, session) => {
  req.payload.id = session.user.id;
  await walker.update(req.payload);
  
  return {
    ...constants['200'],
    profile: await user.get(req.payload.id),
    walkerInfo: await walker.get(req.payload.id),
  };
};

module.exports.get = async (req, h, session) => {
  return walker.get(req.params.walker || session.user.id);
};

module.exports.rate = async (req, h) => {
  const w = await walker.get(req.payload.id);
  if (!w) return {
    ...constants['404'],
    message: 'walker not found!',
  };
  await walker.rate({
    id: req.payload.id,
    rating: w.rating + req.payload.rate,
    raters: w.raters + 1,
  });
  return constants['200'];
};
