const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.findOne = async (model, where, options = {}) => {
  return Model[model].findOne({
    where,
    ...options,
    raw: true,
  });
};

module.exports.findAll = async (model, where, options = {}) => {
  return Model[model].findAll({
    where,
    ...options,
    raw: true,
  });
};

module.exports.create = async (model, data) => {
  return Model[model].create(data);
};

module.exports.update = async (model, data, where) => {
  await Model[model].update(data, { where });
};

module.exports.delete = async (model, where) => {
  await Model[model].destroy({ where });
}

module.exports.dupCheck = async (model, data, checks = ['phoneNumber', 'email']) => {
  if (!Array.isArray(checks)) checks = [ checks ];
  for (let i = 0; i < checks.length; i++) {
    if (!data[checks[i]]) continue;
    const key = checks[i];
    const duplicate = await this.findOne(model, {
      [key]: data[key],
    });
    if (!duplicate) continue;

    return {
      key,
      duplicate,
    };
  }

  return {
    key: null,
    duplicate: null,
  };
};
