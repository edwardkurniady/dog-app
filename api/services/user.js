const path = require('path');
const root = path.resolve('.');

const constants = require(`${root}/const`);
const Model = require(`${root}/models`);

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
  const dupsCheck = ['phoneNumber', 'email'];
  for (let i = 0; i < dupsCheck.length; i++) {
    const where = {};
    where[dupsCheck[i]] = data[dupsCheck[i]];
    if (!(await Model.User.findOne({ where }))) continue;
    return {
      ...constants['409'],
      message: `duplicate ${dupsCheck[i]}!`,
    };
  }

  data.isWalker = false;

  const newData = {};
  Object.keys(Model.User.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  await Model.User.create(newData);

  return constants['200'];
};
