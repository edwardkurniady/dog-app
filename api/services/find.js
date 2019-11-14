const path = require('path');
const Model = require(path.resolve('.', 'models'));

module.exports = async (model, payload, keys) => {
  keys = Array.isArray(keys) ? keys : [ keys ];
  const options = {};
  keys.forEach(key => {
    options[key] = payload[key];
  });

  return await Model[model].findOne({
    where: options,
  });
};
