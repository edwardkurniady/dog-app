const Model = require('../../models');

module.exports.login = async (req) => {
  const payload = { ...req.payload };
  const user = await Model.User.findOne({
    where: { phoneNumber: payload.phoneNumber },
  });

  if (!user) return 'phone number not found';
  if(user.password != payload.password) return 'wrong password';

  return 'successful login';
};

module.exports.register = async (req) => {
  const payload = { ...req.payload };
  const user = await Model.User.findOne({
    where: { phoneNumber: payload.phoneNumber },
  });

  if (user) return 'phone number is already registered';

  const newUser = {};
  Object.keys(Model.User.rawAttributes).forEach(attb => {
    newUser[attb] = payload[attb];
    if (attb === 'isWalker') newUser[attb] = false;
  });
  Model.User.create(newUser);
  
  return 'successful registration'
};
