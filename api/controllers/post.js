const path = require('path');
const root = path.resolve('.');
const Bounce = require('bounce');
const constants = require(`${root}/const`);
const Model = require(`${root}/models`);

module.exports.upload = async (req, h) => {
  try {
    await Model.Post.create({
      ...req.payload,
      likes: 0,
    });

    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.update = async (req, h) => {
  try {
    await Model.Post.create({
      ...req.payload,
      likes: 0,
    });

    return constants['200'];
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.like = async (req, h) => {
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
