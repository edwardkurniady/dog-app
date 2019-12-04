const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.register = async (data) => {
  const newData = {};
  Object.keys(Model.Walker.rawAttributes).forEach(attb => {
    newData[attb] = data[attb];
  });
  return Model.Walker.create(newData);
};

module.exports.update = async (data) => {
  await Model.Walker.update(data, {
    where: {
      id: data.id,
    },
  });
};

module.exports.get = async (id) => {
  return Model.Walker.findOne({
    raw: true,
    where: { id },
  });
};

module.exports.rate = async (data) => {
  return Model.Walker.update(data, {
    where: { id: data.id },
  });
}
