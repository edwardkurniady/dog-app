const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);
const { photo } = require(`${root}/utils`);
const { storageURL } = require(`${root}/const`);

module.exports.login = async (creds) => {
  return Model.User.findOne({
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
    newData[attb] = attb === 'photo' ? null : data[attb];
  });
  const user = await Model.User.create(newData);

  if (!data.photo) return;
  
  await photo.upload(data.photo, user.id, 'user/profile');
  await user.update({
    photo: `${storageURL}/${process.env.BUCKET_NAME}/user/${user.id}/profile`,
  });
};

module.exports.update = async (data) => {
  if (data.deletePhoto) {
    data.photo = null;
    await photo.delete(data.id, 'user/profile');
  }
  if (data.photo)
    data.photo = await photo.upload(data.photo, data.id, 'user/profile');

  delete data.deletePhoto;
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
