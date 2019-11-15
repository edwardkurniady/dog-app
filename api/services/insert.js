const path = require('path');
const Model = require(path.resolve('.', 'models'));

module.exports = async (model, payload) => {
  const newData = {};
  Object.keys(Model[model].rawAttributes).forEach(attb => {
    newData[attb] = payload[attb];
  });
  await Model[model].create(newData);
};
