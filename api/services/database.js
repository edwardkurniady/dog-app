const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);
const moment = require('moment-timezone');

function processDate (data) {
  const isArray = Array.isArray(data);
  data = isArray ? data : [ data ];

  const result = data.map(d => {
    if (!d.createdAt) return d;
    d.createdAt = moment(d.createdAt).tz('Asia/Jakarta').format('ss:mm:hh DD/MM/YYYY');
    return d;
  });

  return isArray ? result : result[0];
}

module.exports.findOne = async (model, where, options = {}) => {
  const data = await Model[model].findOne({
    where,
    ...options,
    raw: true,
  });

  return processDate(data);
};

module.exports.findAll = async (model, where, options = {}) => {
  const data = await Model[model].findAll({
    where,
    ...options,
    raw: true,
  });

  return processDate(data);
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
