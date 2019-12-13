const path = require('path');
const root = path.resolve('.');
const { Op } = require('sequelize');
const {
  dog,
  user,
  walker,
  transaction,
} = require(`${root}/api/services`);

module.exports.findAWalker = async (req, h, session) => {
  const u = await user.get(session.user.id);
  req.payload.address = u.address;
  const dogs = await dog.getList({
    id: { [Op.in]: req.payload.dogs },
  });
  const heaviest = dogs.reduce((acc, curr) => {
    const accW = acc.weight;
    const currW = curr.weight;
    return accW > currW ? accW : currW;
  }, { weight: 0 });

  return walker.findAll({
    // travelDistance: {
    //   $gte: 
    // }
    maxDogSize: { [Op.gte]: heaviest },
    walkDuration: { [Op.gte]: req.payload.duration },
  });
};

module.exports.create = async (req, h, session) => {
  const dogs = req.payload.dogs;
  delete req.payload.dogs;

  const w = await walker.get(req.payload.walkerId);

  await transaction.create({
    ...req.payload,
    userId: session.user.id,
    status: 'ORDERED',
    basePrice: w * dogs.length,
  }, dogs);

};
