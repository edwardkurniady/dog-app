const path = require('path');
const Model = require(path.resolve('.', 'models'));

const include = {
  dog: [
    {
      model: Model.Breed,
      attributes: [
        'name',
      ],
    },
  ],
};


module.exports = async (model, payload = {}, keys = [], options = {}) => {
  keys = Array.isArray(keys) ? keys : [ keys ];
  const where = {};
  keys.forEach(key => {
    where[key] = payload[key];
  });

  return await Model[model].findAll({
    where,
    ...options,
    include: include[model.toLowerCase()]
  });
};
