const Model = require('../models');

module.exports = async (model, data, checks = ['phoneNumber', 'email']) => {
  if (!Array.isArray(checks)) checks = [ checks ];
  for (let i = 0; i < checks.length; i++) {
    if (!data[checks[i]]) continue;
    const where = {};
    where[checks[i]] = data[checks[i]];
    const duplicate = await Model[model].findOne({ where });
    if (!duplicate) continue;

    return {
      duplicate,
      key: checks[i],
    };
  }

  return {
    key: null,
    duplicate: null,
  }
}