const path = require('path');
const Model = require(path.resolve('.', 'models'));

module.exports.login = async (creds) => {
  return await Model.User.findOne({
    raw: true,
    where: {
      phoneNumber: creds.phoneNumber,
    },
  });
};

module.exports.register = async (data) => {
  data.isWalker = false;
  const newData = {};
  Object.keys(Model.User.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  await Model.User.create(newData);
};

module.exports.update = async (data) => {
  await Model.User.update(data, {
    where: {
      id: data.id,
    },
  });
};
