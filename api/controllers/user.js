const path = require('path');
const Bounce = require('bounce');
const Model = require(path.resolve('.', 'models'));
const constants = require(path.resolve('.', 'const'));
const {
  crypt,
  normalize,
} = require(path.resolve('.', 'utils'));

module.exports.login = async (req, h) => {
  const payload = { ...req.payload };
  payload.phoneNumber = normalize.phoneNumber(payload.phoneNumber);
  payload.password = crypt.encrypt(payload.password);
  
  try {
    const user = await Model.User.findOne({
      where: { phoneNumber: payload.phoneNumber },
    });
  
    const errResp = {
      message: null,
      ...constants['401'],
    };

    if (!user) errResp.message = 'Phone number not registered!';
    if (user && user.password != payload.password) errResp.message = 'Wrong password!';
    if (errResp.message) return errResp;

    return {
      ...constants['200'],
      cookie: '',
    };

  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};

module.exports.register = async (req, h) => {
  const payload = { ...req.payload };
  payload.phoneNumber = normalize.phoneNumber(payload.phoneNumber);
  payload.password = crypt.encrypt(payload.password);

  try {
    const user = await Model.User.findOne({
      where: { phoneNumber: payload.phoneNumber },
    });
  
    if (user) return constants['409'];
  
    const newUser = {};
    Object.keys(Model.User.rawAttributes).forEach(attb => {
      newUser[attb] = payload[attb];
      if (attb === 'isWalker') newUser[attb] = false;
    });
    Model.User.create(newUser);
    
    return constants['200'];
    
  } catch(e) {
    console.error(e);
    Bounce.rethrow(e, 'boom');
    Bounce.rethrow(e, 'system');
  }
};
