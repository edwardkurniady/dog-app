const path = require('path');
const root = path.resolve('.');
const constants = require(`${root}/const`);
const {
  database,
  firebase,
} = require('../services');
const {
  filter,
  processCred,
} = require(`${root}/utils`);

module.exports.notification = async (req, _) => {
  const { payload } = req;
  const u = await database.findOne('User', { id: payload.userId });
  const message = u ? (u.token ? null : 'User device not registered!') : 'User not found!';
  if (message) return {
    ...constants['404'],
    message,
  };
  await firebase.notify(u.token, payload.title, payload.body);
  return {
    ...constants['200'],
    body: null,
  };
};
