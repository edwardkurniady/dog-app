const path = require('path');
const root = path.resolve('.');
const Model = require(`${root}/models`);

module.exports.find = async (id) => {
  return Model.Comment.findOne({
    raw: true,
    where: { id },
  });
};

module.exports.getList = async (postId) => {
  return Model.Comment.findAll({
    raw: true,
    where: { postId },
  });
};

module.exports.get = async (userId) => {
  return Model.Comment.findAll({
    raw: true,
    where: { userId },
  });
};

module.exports.upload = async (data) => {
  await Model.Comment.create(data);
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

module.exports.hasLiked = async (data) => {
  return Model.CommentLike.findOne({
    where: data,
  });
};

module.exports.like = async (data, likes) => {
  await Model.CommentLike.create(data);
  await Model.Comment.update({ likes }, {
    where: { id: data.commentId },
  });
};

module.exports.unlike = async (commentlike, likes, id) => {
  await commentlike.destroy();
  await Model.Comment.update({ likes }, {
    where: { id },
  });
};
