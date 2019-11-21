const path = require('path');
const root = path.resolve('.');

const constants = require(`${root}/const`);
const Model = require(`${root}/models`);
const { dupCheck } = require(`${root}/utils`);

module.exports.login = async (creds) => {
  const errResp = {
    message: null,
    ...constants['401'],
  };
  
  const user = await Model.User.findOne({
    where: {
      phoneNumber: creds.phoneNumber,
    },
  });

  if (!user) errResp.message = 'Phone number not registered!';
  if (user && user.password != creds.password) errResp.message = 'Wrong password!';
  if (errResp.message) return errResp;

  return constants['200'];
};

module.exports.register = async (data) => {
  const {
    key,
    duplicate,
  } = await dupCheck('User', ['phoneNumber', 'email'], data);

  if (duplicate) return {
    ...constants['409'],
    message: `duplicate ${key}!`,
  };

  data.isWalker = false;

  const newData = {};
  Object.keys(Model.User.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  await Model.User.create(newData);

  return constants['200'];
};

module.exports.update = async (data) => {
  const {
    key,
    duplicate,
  } = await dupCheck('User', ['phoneNumber', 'email'], data);
  const isUserData = duplicate ? duplicate.id === data.id : null;

  if (duplicate && !isUserData) return {
    ...constants['409'],
    message: `duplicate ${key}!`,
  };

  await Model.User.update(data, {
    where: {
      id: data.id,
    },
  });

  return constants['200'];
};
