const crypt = require('./crypt');
const normalize = require('./normalize');

module.exports = (credentials) => {
  if (credentials.phoneNumber)
    credentials.phoneNumber = normalize.phoneNumber(credentials.phoneNumber);
  if (credentials.password)
    credentials.password = crypt.encrypt(credentials.password);
  return credentials;
}
