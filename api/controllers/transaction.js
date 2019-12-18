// const path = require('path');
// const root = path.resolve('.');
// const { Op } = require('sequelize');
// const {
//   dog,
//   user,
//   walker,
//   transaction,
// } = require(`${root}/api/services`);

// module.exports.findAWalker = async (req, h, session) => {
//   const u = await user.get(session.user.id);
//   req.payload.address = u.address;
//   const dogs = await dog.getList({
//     id: { [Op.in]: req.payload.dogs },
//   });
//   const heaviest = dogs.reduce((acc, curr) => {
//     const accW = acc.weight;
//     const currW = curr.weight;
//     return accW > currW ? accW : currW;
//   }, { weight: 0 });

//   return walker.findAll({
//     // travelDistance: {
//     //   $gte: 
//     // }
//     maxDogSize: { [Op.gte]: heaviest },
//     walkDuration: { [Op.gte]: req.payload.duration },
//   });
// };

// module.exports.create = async (req, h, session) => {
//   const dogs = req.payload.dogs;
//   delete req.payload.dogs;

//   const w = await walker.get(req.payload.walkerId);

//   await transaction.create({
//     ...req.payload,
//     userId: session.user.id,
//     status: 'ORDERED',
//     basePrice: w * dogs.length,
//   }, dogs);

// };

// const path = require('path');
// const root = path.resolve('.');
// const Model = require(`${root}/models`);

// module.exports.create = async (data, dogs) => {
//   const trx = (await Model.Transaction.create(data)).dataValues;
//   for (let i = 0; i < dogs.length; i++) {
//     await Model.TransactionDetail.create({
//       dogId: dogs[i],
//       transactionId: trx.id,
//     });
//   }
//   await Model.Walk.create({
//     transactionId: trx.id,
//   });
// };

// module.exports.update = async (data) => {
//   await Model.Comment.update(data, {
//     where: { id: data.id },
//   });
// };

// module.exports.delete = async (id) => {
//   await Model.Comment.destroy({
//     where: { id },
//   });
// };

// module.exports.hasLiked = async (userId, commentId) => {
//   return Model.CommentLike.findOne({
//     where: {
//       userId,
//       commentId,
//     },
//   });
// };

// module.exports.like = async (data, likes) => {
//   await Model.CommentLike.create(data);
//   await Model.Comment.update({ likes }, {
//     where: { id: data.commentId },
//   });
// };

// module.exports.unlike = async (data, likes, id) => {
//   await Model.CommentLike.destroy({
//     where: data,
//   });
//   await Model.Comment.update({ likes }, {
//     where: { id },
//   });
// };
