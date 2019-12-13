const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.create = async (data, dogs) => {
  const trx = (await Model.Transaction.create(data)).dataValues;
  for (let i = 0; i < dogs.length; i++) {
    await Model.TransactionDetail.create({
      dogId: dogs[i],
      transactionId: trx.id,
    });
  }
  await Model.Walk.create({
    transactionId: trx.id,
  });
};

module.exports.update = async (data) => {
  await Model.Comment.update(data, {
    where: { id: data.id },
  });
};

module.exports.delete = async (id) => {
  await Model.Comment.destroy({
    where: { id },
  });
};

module.exports.hasLiked = async (userId, commentId) => {
  return Model.CommentLike.findOne({
    where: {
      userId,
      commentId,
    },
  });
};

module.exports.like = async (data, likes) => {
  await Model.CommentLike.create(data);
  await Model.Comment.update({ likes }, {
    where: { id: data.commentId },
  });
};

module.exports.unlike = async (data, likes, id) => {
  await Model.CommentLike.destroy({
    where: data,
  });
  await Model.Comment.update({ likes }, {
    where: { id },
  });
};
