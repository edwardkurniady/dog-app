const path = require('path');
const root = path.resolve('.');

const constants = require(`${root}/const`);
const Model = require(`${root}/models`);

module.exports.register = async (data) => {
  const newData = {};
  Object.keys(Model.Dog.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  await Model.Dog.create(newData);

  return constants['200'];
};

module.exports.getList = async (owner_id, options) => {
  return await Model.Dog.findAll({
    ...options,
    raw: true,
    where: {
      owner_id,
    },
    include: [
      {
        model: Model.Breed,
        attributes: [ 'name' ],
      },
    ],
  });
};
