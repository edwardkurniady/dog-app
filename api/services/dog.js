const path = require('path');
const Model = require(path.resolve('.', 'models'));

module.exports.register = async (data) => {
  const newData = {};
  Object.keys(Model.Dog.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  await Model.Dog.create(newData);
};

module.exports.getList = async (ownerId, options) => {
  return await Model.Dog.findAll({
    ...options,
    raw: true,
    where: { ownerId },
    include: [
      {
        model: Model.Breed,
        attributes: [ 'name' ],
      },
    ],
  });
};
