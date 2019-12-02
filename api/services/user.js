const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);
const { photo } = require(`${root}/utils`);
const { storageURL } = require(`${root}/const`);

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
    newData[attb] = attb === 'photo' ? '' : data[attb];
  });
  const user = await Model.User.create(newData);
  
  await photo.upload(data.photo, user.id, 'profile');
  user.update({
    photo: `${storageURL}/${process.env.BUCKET_NAME}/${user.id}/profile`,
  });
};

module.exports.update = async (data) => {
  if (data.deletePhoto)
    await photo.delete(data.id, 'profile');
  if (data.photo)
    data.photo = await photo.upload(data.photo, data.id, 'profile');

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
