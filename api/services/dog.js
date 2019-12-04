const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);
const { photo } = require(`${root}/utils`);
const { storageURL } = require(`${root}/const`);

module.exports.register = async (data) => {
  const newData = {};
  Object.keys(Model.Dog.rawAttributes).forEach(attb => {
    newData[attb] = attb === 'photo' ? null : data[attb];
  });
  const dog = await Model.Dog.create(newData);

  if (!data.photo) return;

  await photo.upload(data.photo, dog.id, 'dog/profile');
  await dog.update({
    photo: `${storageURL}/${process.env.BUCKET_NAME}/dog/${dog.id}/profile`,
  });
};

module.exports.getList = async (ownerId, options) => {
  return Model.Dog.findAll({
    ...options,
    raw: true,
    where: { ownerId },
    include: [
      { 
        model: Model.Breed,
        attributes: [
          'id',
          'name',
        ],
      },
    ],
  });
};

module.exports.update = async (data) => {
  if (data.deletePhoto) {
    data.photo = null;
    await photo.delete(data.id, 'dog/profile');
  }
  if (data.photo)
    data.photo = await photo.upload(data.photo, data.id, 'dog/profile');

  delete data.deletePhoto;
  await Model.Dog.update(data, {
    where: {
      id: data.id,
    },
  });
};

module.exports.find = async (id) => {
  return Model.Dog.findOne({
    raw: true,
    where: { id },
    include: [
      { 
        model: Model.Breed,
        attributes: [
          'id',
          'name',
        ],
      },
    ],
  });
};

module.exports.delete = async (id) => {
  return Model.Dog.destroy({
    where: { id },
  });
};
