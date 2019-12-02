const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);
const { photo } = require(`${root}/utils`);

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
  data.photo = await photo.upload(data.photo, data.id, 'profile');

  const newData = {};
  Object.keys(Model.User.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  await Model.User.create(newData);
};

module.exports.update = async (data) => {
  if (data.photo)
    data.photo = await photo.upload(data.photo, data.id, 'profile');
  await Model.User.update(data, {
    where: {
      id: data.id,
    },
  });
};

module.exports.get = async (id) => {
  return Model.User.findOne({
    raw: true,
    where: { id },
  });
};
